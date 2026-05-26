// To-Do State Management
class TodoManager {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
    }

    loadTodos() {
        try {
            const saved = localStorage.getItem('todos');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            return [];
        }
    }

    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    }

    addTodo(text, priority = 'medium') {
        if (!text.trim()) return false;

        const todo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            priority,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        return todo;
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
        }
    }

    editTodo(id, text) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.text = text.trim();
            todo.updatedAt = new Date().toISOString();
            this.saveTodos();
        }
    }

    getFilteredTodos(filter) {
        switch (filter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
    }

    getStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

        return { total, completed, percentage };
    }
}

// Initialize manager
const manager = new TodoManager();

// DOM Elements
const todoInput = document.getElementById('todoInput');
const prioritySelect = document.getElementById('prioritySelect');
const todosContainer = document.getElementById('todosContainer');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    render();
});

/**
 * Add a new todo
 */
window.addTodo = function() {
    const text = todoInput.value.trim();
    const priority = prioritySelect.value;

    if (!text) {
        alert('الرجاء إدخال مهمة');
        return;
    }

    manager.addTodo(text, priority);
    todoInput.value = '';
    prioritySelect.value = 'medium';
    render();
};

/**
 * Toggle todo completion
 */
window.toggleTodo = function(id) {
    manager.toggleTodo(id);
    render();
};

/**
 * Edit todo
 */
window.editTodo = function(id) {
    const todo = manager.todos.find(t => t.id === id);
    if (!todo) return;

    const newText = prompt('تعديل المهمة:', todo.text);
    if (newText !== null) {
        manager.editTodo(id, newText);
        render();
    }
};

/**
 * Delete todo
 */
window.deleteTodo = function(id) {
    if (confirm('هل تريد حذف هذه المهمة؟')) {
        manager.deleteTodo(id);
        render();
    }
};

/**
 * Filter todos
 */
window.filterTodos = function(filter) {
    manager.currentFilter = filter;
    
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    render();
};

/**
 * Clear completed todos
 */
window.clearCompleted = function() {
    if (confirm('هل تريد حذف جميع المهام المكتملة؟')) {
        manager.clearCompleted();
        render();
    }
};

/**
 * Export todos
 */
window.exportTodos = function() {
    const data = JSON.stringify(manager.todos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Import todos
 */
window.importTodos = function() {
    document.getElementById('importFile').click();
};

/**
 * Handle import
 */
window.handleImport = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                if (confirm('استبدال جميع المهام الحالية؟')) {
                    manager.todos = imported;
                    manager.saveTodos();
                    render();
                    alert('تم استيراد المهام بنجاح!');
                }
            } else {
                alert('صيغة الملف غير صحيحة');
            }
        } catch (error) {
            alert('خطأ في قراءة الملف');
        }
    };
    reader.readAsText(file);
};

/**
 * Reset all todos
 */
window.resetTodos = function() {
    if (confirm('هل تريد حذف جميع المهام؟')) {
        manager.todos = [];
        manager.saveTodos();
        render();
    }
};

/**
 * Render UI
 */
function render() {
    const filtered = manager.getFilteredTodos(manager.currentFilter);
    const stats = manager.getStats();

    // Update stats
    document.getElementById('totalTodos').textContent = stats.total;
    document.getElementById('completedTodos').textContent = stats.completed;
    document.getElementById('completionPercent').textContent = `${stats.percentage}%`;

    // Render todos
    if (filtered.length === 0) {
        todosContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    todosContainer.innerHTML = filtered.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="priority-badge ${todo.priority}">${getPriorityLabel(todo.priority)}</span>
            <div class="todo-content">
                <div class="todo-text">${escapeHtml(todo.text)}</div>
                <div class="todo-date">${formatDate(todo.createdAt)}</div>
            </div>
            <div class="todo-actions">
                <button class="todo-btn edit-btn" onclick="editTodo(${todo.id})">تعديل</button>
                <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

/**
 * Utilities
 */
function getPriorityLabel(priority) {
    const labels = {
        high: 'عالية',
        medium: 'متوسطة',
        low: 'منخفضة'
    };
    return labels[priority] || priority;
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('ar-AE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

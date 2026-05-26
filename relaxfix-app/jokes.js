// Joke API Configuration
const JOKE_API_URL = 'https://official-joke-api.appspot.com';

// State
let currentJoke = null;
let loadedCount = 0;
let favorites = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
let selectedCategory = 'any';

// DOM Elements
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const jokeContainer = document.getElementById('jokeContainer');
const jokeText = document.getElementById('jokeText');
const jokeAnswer = document.getElementById('jokeAnswer');
const jokeType = document.getElementById('jokeType');
const revealBtn = document.getElementById('revealBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const favoritesContainer = document.getElementById('favoritesContainer');
const favoritesList = document.getElementById('favoritesList');
const loadedCountSpan = document.getElementById('loadedCount');
const favoriteCountSpan = document.getElementById('favoriteCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    getRandomJoke();
});

/**
 * Get a random joke
 */
window.getRandomJoke = async function() {
    try {
        showLoading(true);
        hideError();

        let url = `${JOKE_API_URL}/random_joke`;
        
        if (selectedCategory !== 'any') {
            url = `${JOKE_API_URL}/jokes/${selectedCategory}/random`;
        }

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('فشل في جلب النكتة');
        }

        const data = await response.json();
        
        // Handle array response
        currentJoke = Array.isArray(data) ? data[0] : data;
        displayJoke(currentJoke);
        loadedCount++;
        updateStats();
        showLoading(false);
    } catch (error) {
        showError('عذراً، حدث خطأ في جلب النكتة. حاول مجدداً!');
        showLoading(false);
        console.error('Joke API error:', error);
    }
};

/**
 * Display joke
 */
function displayJoke(joke) {
    jokeType.textContent = joke.type || 'عام';
    jokeText.textContent = joke.setup || joke.joke;
    
    if (joke.delivery || joke.punchline) {
        jokeAnswer.textContent = joke.delivery || joke.punchline;
        jokeAnswer.classList.add('hidden');
        revealBtn.classList.remove('hidden');
    } else {
        revealBtn.classList.add('hidden');
    }

    // Update favorite button
    const isFavorite = favorites.some(fav => fav.id === joke.id);
    if (isFavorite) {
        favoriteBtn.classList.add('active');
    } else {
        favoriteBtn.classList.remove('active');
    }

    jokeContainer.classList.remove('hidden');
}

/**
 * Reveal answer
 */
window.revealAnswer = function() {
    jokeAnswer.classList.remove('hidden');
    revealBtn.classList.add('hidden');
};

/**
 * Copy to clipboard
 */
window.copyToClipboard = function() {
    if (!currentJoke) return;

    const text = `${jokeText.textContent}\n${jokeAnswer.textContent}`;
    navigator.clipboard.writeText(text).then(() => {
        alert('تم نسخ النكتة!');
    }).catch(() => {
        alert('فشل النسخ');
    });
};

/**
 * Share joke
 */
window.shareJoke = function() {
    if (!currentJoke) return;

    const text = `${jokeText.textContent}\n${jokeAnswer.textContent}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'نكتة مضحكة',
            text: text
        }).catch(err => console.error('Share error:', err));
    } else {
        // Fallback to WhatsApp
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    }
};

/**
 * Add to favorites
 */
window.addToFavorites = function() {
    if (!currentJoke) return;

    const isFavorite = favorites.some(fav => fav.id === currentJoke.id);
    
    if (isFavorite) {
        favorites = favorites.filter(fav => fav.id !== currentJoke.id);
        favoriteBtn.classList.remove('active');
    } else {
        favorites.push(currentJoke);
        favoriteBtn.classList.add('active');
    }

    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
    updateStats();
};

/**
 * Toggle favorites view
 */
window.toggleFavorites = function() {
    if (favoritesContainer.classList.contains('hidden')) {
        loadFavorites();
        favoritesContainer.classList.remove('hidden');
    } else {
        favoritesContainer.classList.add('hidden');
    }
};

/**
 * Load and display favorites
 */
function loadFavorites() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p style="text-align: center; color: var(--text-light);">لا توجد نكات مفضلة حتى الآن</p>';
        return;
    }

    favoritesList.innerHTML = favorites.map(joke => `
        <div class="favorite-item">
            <p>${joke.setup || joke.joke}</p>
            <button class="remove-favorite-btn" onclick="removeFavorite(${joke.id})">حذف</button>
        </div>
    `).join('');
}

/**
 * Remove favorite
 */
window.removeFavorite = function(jokeId) {
    favorites = favorites.filter(fav => fav.id !== jokeId);
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
    loadFavorites();
    updateStats();
    
    if (currentJoke?.id === jokeId) {
        favoriteBtn.classList.remove('active');
    }
};

/**
 * Filter by category
 */
window.filterByCategory = function() {
    selectedCategory = document.getElementById('categorySelect').value;
    getRandomJoke();
};

/**
 * Update statistics
 */
function updateStats() {
    loadedCountSpan.textContent = loadedCount;
    favoriteCountSpan.textContent = favorites.length;
}

/**
 * UI Helpers
 */
function showLoading(show) {
    loadingDiv.classList.toggle('hidden', !show);
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
}

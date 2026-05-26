// Weather API Configuration
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'your_api_key_here';
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const weatherContent = document.getElementById('weatherContent');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedCities();
    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                // Default to a city if location access denied
                fetchWeatherByCity('Dubai');
            }
        );
    }
});

// Search functionality
window.searchWeather = function() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    }
};

// Enter key support
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        window.searchWeather();
    }
});

/**
 * Fetch weather by city name
 */
async function fetchWeatherByCity(city) {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(
            `${WEATHER_API_BASE}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=ar`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('لم يتم العثور على المدينة');
            }
            throw new Error('خطأ في جلب بيانات الطقس');
        }

        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(data.coord.lat, data.coord.lon);
        addSavedCity(data.name, data.sys.country);
        showLoading(false);
    } catch (error) {
        showError(error.message);
        showLoading(false);
    }
}

/**
 * Fetch weather by coordinates
 */
async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(
            `${WEATHER_API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ar`
        );

        if (!response.ok) {
            throw new Error('خطأ في جلب بيانات الطقس');
        }

        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(lat, lon);
        showLoading(false);
    } catch (error) {
        showError(error.message);
        showLoading(false);
    }
}

/**
 * Fetch 5-day forecast
 */
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${WEATHER_API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ar`
        );

        if (!response.ok) {
            throw new Error('خطأ في جلب التوقعات');
        }

        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

/**
 * Display current weather
 */
function displayCurrentWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('weatherDesc').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;

    // Weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    weatherContent.classList.remove('hidden');
    cityInput.value = '';
}

/**
 * Display 5-day forecast
 */
function displayForecast(forecastList) {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';

    // Get forecast for each day (one per day at noon)
    const dailyForecasts = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('ar-AE');
        
        // Keep only noon forecast for each day
        if (!dailyForecasts[dayKey] || date.getHours() === 12) {
            dailyForecasts[dayKey] = item;
        }
    });

    // Display first 5 days
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const html = `
            <div class="forecast-item">
                <div class="date">${date.toLocaleDateString('ar-AE', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Weather">
                <div class="temp">${Math.round(forecast.main.temp)}°C</div>
                <div class="desc">${forecast.weather[0].description}</div>
            </div>
        `;
        container.innerHTML += html;
    });
}

/**
 * Manage saved cities
 */
function getSavedCities() {
    const saved = localStorage.getItem('savedCities');
    return saved ? JSON.parse(saved) : [];
}

function addSavedCity(city, country) {
    const cities = getSavedCities();
    const cityObj = { city, country };
    
    // Check if city already exists
    const exists = cities.some(c => c.city.toLowerCase() === city.toLowerCase());
    if (!exists) {
        cities.unshift(cityObj);
        if (cities.length > 5) cities.pop(); // Keep only 5
        localStorage.setItem('savedCities', JSON.stringify(cities));
        loadSavedCities();
    }
}

function removeSavedCity(city) {
    let cities = getSavedCities();
    cities = cities.filter(c => c.city !== city);
    localStorage.setItem('savedCities', JSON.stringify(cities));
    loadSavedCities();
}

function loadSavedCities() {
    const container = document.getElementById('savedCitiesList');
    const cities = getSavedCities();
    
    if (cities.length === 0) {
        container.innerHTML = '<p style="color: var(--text-light);">لا توجد مدن محفوظة</p>';
        return;
    }

    container.innerHTML = cities.map(cityObj => `
        <button class="city-button" onclick="fetchWeatherByCity('${cityObj.city}')">
            <span>🌍 ${cityObj.city}, ${cityObj.country}</span>
            <span class="remove" onclick="event.stopPropagation(); removeSavedCity('${cityObj.city}')">❌</span>
        </button>
    `).join('');
}

/**
 * UI Helper functions
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

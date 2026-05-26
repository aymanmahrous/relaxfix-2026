import axios from "axios";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

/**
 * GET /api/weather?city=Dubai
 * Fetch weather data for a specific city
 */
export const getWeatherByCity = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        if (!OPENWEATHER_API_KEY) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const response = await axios.get(
            `${OPENWEATHER_API_BASE}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ar`
        );

        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Weather API error:', error.message);
        
        if (error.response?.status === 404) {
            return res.status(404).json({ 
                error: 'City not found',
                success: false 
            });
        }

        res.status(500).json({ 
            error: 'Failed to fetch weather data',
            success: false 
        });
    }
};

/**
 * GET /api/weather/forecast?lat=25.2048&lon=55.2708
 * Fetch 5-day forecast
 */
export const getForecast = async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        if (!OPENWEATHER_API_KEY) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const response = await axios.get(
            `${OPENWEATHER_API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ar`
        );

        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Forecast API error:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch forecast',
            success: false 
        });
    }
};

export default {
    getWeatherByCity,
    getForecast
};
import axios from "axios";

const JOKE_API_URL = 'https://official-joke-api.appspot.com';

/**
 * GET /api/jokes/random
 * Get a random joke
 */
export const getRandomJoke = async (req, res) => {
    try {
        const response = await axios.get(`${JOKE_API_URL}/random_joke`);
        
        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Joke API error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch joke'
        });
    }
};

/**
 * GET /api/jokes/category/:category
 * Get a joke by category
 */
export const getJokeByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        
        if (!category) {
            return res.status(400).json({
                error: 'Category is required'
            });
        }

        const response = await axios.get(
            `${JOKE_API_URL}/jokes/${category}/random`
        );
        
        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Joke API error:', error.message);
        
        if (error.response?.status === 404) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to fetch joke'
        });
    }
};

/**
 * GET /api/jokes/types
 * Get all available joke types
 */
export const getJokeTypes = async (req, res) => {
    try {
        const response = await axios.get(`${JOKE_API_URL}/types`);
        
        res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Joke API error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch joke types'
        });
    }
};

export default {
    getRandomJoke,
    getJokeByCategory,
    getJokeTypes
};

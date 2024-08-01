// In your geolocation library (e.g., geolocation.js)
import axios from 'axios';

const API_KEY = process.env.GEOLOCATION_API_KEY; // Replace with your IPInfo API key

export const getGeolocation = async (ipAddress: any) => {
    try {
        const response = await axios.get(`https://ipinfo.io/${ipAddress}?token=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        return null;
    }
};

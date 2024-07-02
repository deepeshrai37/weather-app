// src/services/weatherService.js
import axios from "axios";

const API_KEY = "7b2ab4889dd54e53936134834243006";
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 3, // Number of days for the forecast
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

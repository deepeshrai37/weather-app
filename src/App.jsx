import { useState } from 'react';
import './App.css';
import { getWeatherForecast } from './services/weatherService';
import WeatherStory from './components/weatherstory/WeatherStory';
import EventPlanner from './components/eventplanner/EventPlanner';
import FarmerDashboard from './components/farmerdashboard/FarmerDashboard';
import Spinner from './components/spinner/Spinner';

const App = () => {
  const [city, setCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherForecast(city);
      setWeatherData(data);
    } catch (error) {
      setError('Error fetching the weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleDateChange = (e) => {
    setTravelDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const getForecastForDate = () => {
    if (!weatherData) return null;
    const date = new Date(travelDate).toISOString().split('T')[0];
    return weatherData.forecast.forecastday.find(
      (forecast) => forecast.date === date
    );
  };

  const forecast = getForecastForDate();

  return (
    <div className="App">
      <h1>Weather Oracle</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <input
          type="date"
          value={travelDate}
          onChange={handleDateChange}
          placeholder="Select travel date"
        />
        <button  type="submit">Get Forecast</button>
      </form>
      <div className="container">
        <div className="left-column">
          {loading && <Spinner/>}
          {error && <p>{error}</p>}
          {forecast ? (
            <div className="forecast-details">
              <h2>Weather on {new Date(travelDate).toDateString()}</h2>
              <p>{forecast.day.condition.text}</p>
              <img src={forecast.day.condition.icon} alt={forecast.day.condition.text} />
              <p>Max Temp: {forecast.day.maxtemp_c}°C</p>
              <p>Min Temp: {forecast.day.mintemp_c}°C</p>
              <p>Humidity: {forecast.day.avghumidity}%</p>
              <p>Wind Speed: {forecast.day.maxwind_kph} kph</p>
            </div>
          ) : (
            weatherData && <p>No forecast available for this date</p>
          )}
          <WeatherStory />
        </div>
        <div className="right-column">
          <EventPlanner weatherData={weatherData} />
        </div>
      </div>
      <FarmerDashboard weatherData={weatherData} />
    </div>
  );
};

export default App;
/* eslint-disable react/prop-types */
// src/EventPlanner.jsx
import { useState } from 'react';
import Calendar from 'react-calendar';
import '../eventplanner/eventplanner.css';

const EventPlanner = ({ weatherData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getWeatherForSelectedDate = () => {
    if (!weatherData) return null;
    const date = selectedDate.toISOString().split('T')[0];
    return weatherData.forecast.forecastday.find(
      (forecast) => forecast.date === date
    );
  };

  const forecast = getWeatherForSelectedDate();

  return (
    <div className="EventPlanner">
      <h2>See Weather Conditions for your events</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="custom-calendar"
      />
      {forecast ? (
        <div className="forecast-details">
          <h3>Weather on {selectedDate.toDateString()}</h3>
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
    </div>
  );
};

export default EventPlanner;

/* eslint-disable react/prop-types */
import '../farmerdashboard/farmerdashboard.css';

const FarmerDashboard = ({ weatherData }) => {
  if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) return null;

  return (
    <div className="FarmerDashboard">
      <h2>Farmers Essentials</h2>
      {weatherData.forecast.forecastday.slice(0, 7).map((forecast, index) => (
        <div key={index} className="forecast-day">
          <h3>{new Date(forecast.date).toDateString()}</h3>
          <p>Max Temp: {forecast.day.maxtemp_c}°C</p>
          <p>Min Temp: {forecast.day.mintemp_c}°C</p>
          <p>Humidity: {forecast.day.avghumidity}%</p>
          <p>Precipitation: {forecast.day.daily_chance_of_rain}%</p>
          <p>Wind Speed: {forecast.day.maxwind_kph} kph</p>
        </div>
      ))}
    </div>
  );
};

export default FarmerDashboard;

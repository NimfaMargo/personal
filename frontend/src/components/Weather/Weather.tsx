import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`/api/current-weather`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Error fetching weather data.');
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather">
      <p className="weatherTitle">Current Weather</p>
      <p className="weatherData">
        <strong>Location:</strong> {weatherData.name}, {weatherData.sys.country}
      </p>
      <p className="weatherData">
        <strong>Temperature:</strong> {weatherData.main.temp}°C
      </p>
      <p className="weatherData">
        <strong>Condition:</strong> {weatherData.weather[0].description}
      </p>
    </div>
  );
};

export default Weather;

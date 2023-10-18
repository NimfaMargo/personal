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
    }

    useEffect(() => {
		fetchWeatherData();
		console.log(weatherData, 'weatherData')
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Current Weather</h1>
            <strong>Location:</strong> {weatherData.name}, {weatherData.sys.country} <br />
            <strong>Temperature:</strong> {weatherData.main.temp}°C <br />
            <strong>Condition:</strong> {weatherData.weather[0].description}
        </div>
    );
}

export default Weather;
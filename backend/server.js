require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT;
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

// Use the cors middleware
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from the backend!' });
});

app.get('/api/current-weather', async (req, res) => {
	let geoResponse;
	try {
		geoResponse = await axios.get(`http://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}`);
	} catch (error) {
		console.log('Error fetching geolocation:', error.response.data);
		return res.status(500).json({ message: "Error fetching geolocation" });
	}

	let weatherResponse;
	try {
		const { latitude, longitude } = geoResponse.data;
		weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`);
	} catch (error) {
		console.log('Error fetching weather data:', error.response.data);
		return res.status(500).json({ message: "Error fetching weather data" });
	}

	res.json(weatherResponse.data);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});


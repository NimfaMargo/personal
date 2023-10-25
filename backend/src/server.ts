import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import axios from 'axios';
import { handleAxiosError } from './utils/handleAxiosError';
import {
  GeoResponse,
  WeatherResponse,
  OpenWeatherMapError,
  IpstackError,
  AxiosError,
} from './types';

const PORT = process.env.PORT;
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const IPSTACK_API_KEY = process.env.IPSTACK_API_KEY;

dotenv.config();

const app = express();

// Use the cors middleware
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/current-weather', async (req: Request, res: Response) => {
  try {
    const geoResponse: GeoResponse = await axios.get(
      `http://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}`,
    );
    const { latitude, longitude } = geoResponse.data;

    const weatherResponse: WeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
    );
    res.json(weatherResponse.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const apiError = axiosError.response?.data as IpstackError & OpenWeatherMapError;
    const errorData = apiError.success === false ? apiError.error : apiError;
    return handleAxiosError(errorData, res);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

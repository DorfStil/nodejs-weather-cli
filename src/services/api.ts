import axios from 'axios';
import { getStorageEntry, STORAGE_KEYS } from './storage';
import { City } from '../entities/city';
import { Weather } from '../entities/weather';

export const ENDPOINTS = {
  direct: () => '/geo/1.0/direct',
  weather: () => '/data/2.5/weather',
} as const;

export const REQUEST_TIMEOUT = 5000;

const api = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getCity() {
  const city = await getStorageEntry(STORAGE_KEYS.City);
  const token = await getStorageEntry(STORAGE_KEYS.Token);

  if (!city) {
    throw new Error('Не задан город, укажите город командой -s [CITY_NAME]');
  }

  if (!token) {
    throw new Error('Не задан ключ API, установите ключ командой -t [API_KEY]');
  }

  const { data } = await api.get<City[]>(ENDPOINTS.direct(), {
    params: {
      q: city,
      limit: 1,
      appid: token,
    },
  });

  return data[0];
}

export async function getWeather(lat: number, lon: number) {
  const token = await getStorageEntry(STORAGE_KEYS.Token);

  if (!token) {
    throw new Error('Не задан ключ API, установите ключ командой -t [API_KEY]');
  }

  const { data } = await api.get<Weather>(ENDPOINTS.weather(), {
    params: {
      lat,
      lon,
      appid: token,
      lang: 'ru',
      units: 'metric',
    },
  });

  return data;
}

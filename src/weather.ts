#!/usr/bin/env node
import { getEnviromentArgs } from './utils/getEnviromentArgs';
import { printError, printForecast, printHelp, printSuccess } from './services/logger';
import { setStorageEntry, STORAGE_KEYS } from './services/storage';
import { getCity, getWeather } from './services/api';
import { AxiosError } from 'axios';

async function saveToken(token: string) {
  if (!token.length) {
    printError('Не передан токен');
    return;
  }
  try {
    await setStorageEntry(STORAGE_KEYS.Token, token);
    printSuccess('Токен сохранен');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    printError(message);
  }
}

async function saveCity(city: string) {
  if (!city.length) {
    printError('Не указан город');
    return;
  }
  try {
    await setStorageEntry(STORAGE_KEYS.City, city);
    printSuccess('Город сохранен');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    printError(message);
  }
}

async function getForecast() {
  try {
    const city = await getCity();
    const weather = await getWeather(city.lat, city.lon);
    printForecast(
      city.local_names['ru'],
      weather.weather[0].icon,
      weather.weather[0].description,
      weather.main.temp,
      weather.main.feels_like,
      weather.main.humidity,
      weather.wind.speed,
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        printError('Неверно указан токен');
        return;
      }
      if (error.response?.status === 404) {
        printError('Неверно указан город');
        return;
      }
    }
    if (error instanceof Error) {
      printError(error.message);
    }
  }
}

export const initCLI = () => {
  const args = getEnviromentArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    saveCity(String(args.s));
  }
  if (args.t) {
    return saveToken(String(args.t));
  }
  getForecast();
};

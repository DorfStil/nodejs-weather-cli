# weather

CLI-утилита для просмотра текущей погоды. Работает только с сервисом OpenWeather (https://openweathermap.org/) и использует его API. Позволяет сохранить API‑токен и город, чтобы быстро получать прогноз из терминала.

## Использование

1) Установить зависимости:
```
npm install
```

2) Запуск CLI:
```
npm run start
```

3) Команды:
- `-s [CITY]` — сохранить город
- `-t [API_KEY]` — сохранить токен
- `-h` — показать помощь

## Примеры

```
npm run start -- -s Moscow
npm run start -- -t YOUR_API_KEY
npm run start
```

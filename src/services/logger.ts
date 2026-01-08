import chalk from 'chalk';
import { getIcon } from '../utils';

export function printError(error: string) {
  console.log(`${chalk.bgRed('Ошибка')} ${error}`);
}

export function printSuccess(message: string) {
  console.log(`${chalk.bgGreen('Успех')} ${message}`);
}

export function printHelp() {
  console.log(`
    ${chalk.bgCyan('Помощь')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -t [TOKEN] установка токена
    -h вывод помощи`);
}

export function printForecast(
  city: string,
  icon: string,
  description: string,
  temperature: number,
  feelsLike: number,
  humidity: number,
  windSpeed: number,
) {
  const label = (text: string) => chalk.gray(text.padEnd(18));
  const value = (text: string) => chalk.yellow(text);
  const header = `${chalk.bgYellow.black(' Погода ')} ${chalk.cyan.bold(city)}`;
  const status = `${getIcon(icon)} ${chalk.white(description)}`;

  console.log(
    [
      `\n${header}`,
      status,
      `${label('Температура')} ${value(`${temperature}°C`)}`,
      `${label('Ощущается как')} ${value(`${feelsLike}°C`)}`,
      `${label('Влажность')} ${value(`${humidity}%`)}`,
      `${label('Скорость ветра')} ${value(`${windSpeed} м/с`)}`,
    ].join('\n'),
  );
}

import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

export enum STORAGE_KEYS {
  Token = 'token',
  City = 'city',
}

export const STORAGE_DIR = join(homedir(), '.cli-utils');
export const STORAGE_DATA_FILE_PATH = join(STORAGE_DIR, 'weather-cli-util-data.json');

async function isExists(path: string) {
  try {
    await promises.stat(path);
    return true;
  } catch (_err) {
    return false;
  }
}

export async function setStorageEntry(key: STORAGE_KEYS, value: string) {
  let data: Partial<Record<STORAGE_KEYS, string>> = {};

  if (!(await isExists(STORAGE_DIR))) {
    await promises.mkdir(STORAGE_DIR, { recursive: true });
  }

  if (await isExists(STORAGE_DATA_FILE_PATH)) {
    const file = await promises.readFile(STORAGE_DATA_FILE_PATH, 'utf-8');
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(STORAGE_DATA_FILE_PATH, JSON.stringify(data));
}

export async function getStorageEntry(key: STORAGE_KEYS) {
  if (await isExists(STORAGE_DATA_FILE_PATH)) {
    const file = await promises.readFile(STORAGE_DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(file);
    return data[key];
  }

  return undefined;
}

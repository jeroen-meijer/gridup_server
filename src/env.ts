import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug('Using .env.example file to supply config environment variables');
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}

const asInt = (value: string): number => {
  return parseInt(value) || null;
};

export const ENVIRONMENT = process.env.NODE_ENV;

export const PORT = asInt(process.env['PORT']);
if (!PORT) {
  logger.error('No port provided. Set PORT environment variable to an integer.');
  process.exit(1);
}

export const DEVICE_NAME = process.env['DEVICE_NAME'];
if (!DEVICE_NAME) {
  logger.error('No device name provided. Set DEVICE_NAME environment variable.');
  process.exit(1);
}

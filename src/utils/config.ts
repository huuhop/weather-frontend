
const BASE_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL || 'http://localhost:6969';

export const API_ENDPOINTS = {
  WEATHER_REPORT: `${BASE_URL}/reports`,
};
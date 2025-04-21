import axios from "axios";
import { API_ENDPOINTS } from "@/utils/config";

export const fetchWeatherReport = async (lat: string, lon: string) => {
  const res = await axios.post(API_ENDPOINTS.WEATHER_REPORT, { lat, lon });
  return res.data;
};

export const fetchWeatherHistoryReport = async (params: any) => {
    const res = await axios.get(API_ENDPOINTS.WEATHER_REPORT, {
        params,
      });
    return res.data;
  };

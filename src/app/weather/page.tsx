"use client";
import { useState } from "react";
import WeatherReport from "@/components/WeatherReport";
import { fetchWeatherReport } from "@/services/weatherService";

export default function Weather() {
  const [lat, setLat] = useState<string>("10.8231");
  const [lon, setLon] = useState<string>("106.6297");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherReport(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          🌤️ Weather Forecast App
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
              Latitude (lat):
            </label>
            <input
              type="text"
              id="lat"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lon" className="block text-sm font-medium text-gray-700">
              Longitude (lon):
            </label>
            <input
              type="text"
              id="lon"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "🔍 Check Weather"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        {weatherData && !loading && (
          <div className="mt-6">
            <WeatherReport data={weatherData} />
          </div>
        )}
      </div>
    </div>
  );
}
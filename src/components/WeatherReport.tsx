const WeatherReport = ({ data }: { data: any }) => {
  return (
    <div>
      <h2>Weather Information</h2>
      <p>Time: {new Date(data.timestamp).toLocaleString()}</p>
      <p>Temperature: {data.temperature}°C</p>
      <p>Pressure: {data.pressure} hPa</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Cloud Cover: {data.cloudCover}%</p>
    </div>
  );
};

export default WeatherReport;
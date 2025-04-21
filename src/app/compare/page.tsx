"use client";
import { formatTimestamp } from "@/utils/formatDate";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [report1, setReport1] = useState<any>(null);
  const [report2, setReport2] = useState<any>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      const [r1, r2] = JSON.parse(decodeURIComponent(data));
      setReport1(r1);
      setReport2(r2);
    }
  }, [searchParams]);

  if (!report1 || !report2) return <p className="p-4">Loading comparison...</p>;

  const getDeviation = (a: number, b: number) => `${b - a > 0 ? "+" : ""}${b - a}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-4xl">
      <div className="relative mb-6 flex items-center justify-between">
      <Link
        href="/weather-history"
        className="px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Back
      </Link>
      <h1 className="text-2xl font-bold text-blue-700 mx-auto">
        📊 Weather Report Comparison
      </h1>
    </div>

        <table className="min-w-full table-auto border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Parameter</th>
              <th className="border px-4 py-2">Report 1</th>
              <th className="border px-4 py-2">Report 2</th>
              <th className="border px-4 py-2">Deviation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Timestamp</td>
              <td className="border px-4 py-2">{formatTimestamp(report1.timestamp)}</td>
              <td className="border px-4 py-2">{formatTimestamp(report2.timestamp)}</td>
              <td className="border px-4 py-2">-</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Temperature (°C)</td>
              <td className="border px-4 py-2">{report1.temperature}</td>
              <td className="border px-4 py-2">{report2.temperature}</td>
              <td className="border px-4 py-2">
                {getDeviation(report1.temperature, report2.temperature)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Pressure (hPa)</td>
              <td className="border px-4 py-2">{report1.pressure}</td>
              <td className="border px-4 py-2">{report2.pressure}</td>
              <td className="border px-4 py-2">
                {getDeviation(report1.pressure, report2.pressure)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Humidity (%)</td>
              <td className="border px-4 py-2">{report1.humidity}</td>
              <td className="border px-4 py-2">{report2.humidity}</td>
              <td className="border px-4 py-2">
                {getDeviation(report1.humidity, report2.humidity)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Cloud Cover (%)</td>
              <td className="border px-4 py-2">{report1.cloudCover}</td>
              <td className="border px-4 py-2">{report2.cloudCover}</td>
              <td className="border px-4 py-2">
                {getDeviation(report1.cloudCover, report2.cloudCover)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
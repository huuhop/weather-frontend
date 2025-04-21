"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { formatTimestamp } from "@/utils/formatDate";
import { API_ENDPOINTS } from "@/utils/config";
import { fetchWeatherHistoryReport } from "@/services/weatherService";

export default function WeatherHistory() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedReports, setSelectedReports] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<string>('timestamp');
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const sort = {
          sortBy: sortBy,
          sortDirection
        }
        const params: any = {
          page: currentPage,
          limit: reportsPerPage,
          sort: {
            sortBy: sortBy,
            sortDirection
          }
        }
        const data = await fetchWeatherHistoryReport(params);
        setReports(data.data);
        setTotalReports(data.total);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [currentPage, reportsPerPage, sortDirection, sortBy]); // Fetch lại khi trang hoặc số báo cáo trên mỗi trang thay đổi

  const handleSelect = (report: any) => {
    const alreadySelected = selectedReports.find((r) => r.timestamp === report.timestamp);
    if (alreadySelected) {
      setSelectedReports(selectedReports.filter((r) => r.timestamp !== report.timestamp));
    } else {
      if (selectedReports.length < 2) {
        const newSelection = [...selectedReports, report];
        setSelectedReports(newSelection);
        if (newSelection.length === 2) {
          setShowModal(true);
        }
      } else {
        alert("You can only compare 2 reports at once.");
      }
    }
  };

  const handleCompare = () => {
    if (selectedReports.length !== 2) {
      alert("Please select 2 reports to compare.");
      return;
    }

    const encodedReports = encodeURIComponent(JSON.stringify(selectedReports));
    router.push(`/compare?data=${encodedReports}`);
  };

  const handleCancelModal = () => {
    setShowModal(false);
    setSelectedReports([]);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(totalReports / reportsPerPage)) return;
    setCurrentPage(page);
  };

  const handleSortToggle = (sortBy: string) => {
    const newOrder = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(sortBy);
    setSortDirection(newOrder);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">🌤️ Weather Report History</h1>

        {loading ? (
          <p>Loading reports...</p>
        ) : (
          <>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Select</th>
                  <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSortToggle('timestamp')}>
                    Timestamp
                    <span className={`ml-1 transition-opacity ${sortBy === 'timestamp' ? 'opacity-100' : 'opacity-30'}`}>
                      {sortBy === 'timestamp' && sortDirection === 'asc' && '🔼'}
                      {sortBy === 'timestamp' && sortDirection === 'desc' && '🔽'}
                      {sortBy !== 'timestamp' && '⇅'}
                    </span>
                  </th>
                  <th className="px-4 py-2 border cursor-pointer" onClick={() => handleSortToggle('temperature')}>
                    Temperature (°C)
                    <span className={`ml-1 transition-opacity ${sortBy === 'temperature' ? 'opacity-100' : 'opacity-30'}`}>
                      {sortBy === 'temperature' && sortDirection === 'asc' && '🔼'}
                      {sortBy === 'temperature' && sortDirection === 'desc' && '🔽'}
                      {sortBy !== 'temperature' && '⇅'}
                    </span>
                  </th>
                  {/* <th className="px-4 py-2 border">Temperature (°C)</th> */}
                  <th className="px-4 py-2 border">Pressure (hPa)</th>
                  <th className="px-4 py-2 border">Humidity (%)</th>
                  <th className="px-4 py-2 border">Cloud Cover (%)</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report: any) => (
                  <tr key={report.timestamp}>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedReports.some((r) => r.timestamp === report.timestamp)}
                        onChange={() => handleSelect(report)}
                      />
                    </td>
                    <td className="px-4 py-2 border">{formatTimestamp(report.timestamp)}</td>
                    <td className="px-4 py-2 border">{report.temperature}°C</td>
                    <td className="px-4 py-2 border">{report.pressure} hPa</td>
                    <td className="px-4 py-2 border">{report.humidity}%</td>
                    <td className="px-4 py-2 border">{report.cloudCover}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Previous
              </button>
              <div className="flex items-center">
                <span className="mr-2">Page</span>
                <span>{currentPage}</span>
                <span className="ml-2">of {Math.ceil(totalReports / reportsPerPage)}</span>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * reportsPerPage >= totalReports}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-center">Compare Selected Reports</h2>
            <p className="text-center mb-4">You've selected 2 reports. Would you like to compare them now?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleCompare}
              >
                Yes, Compare
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancelModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
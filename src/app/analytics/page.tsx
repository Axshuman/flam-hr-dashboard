// src/app/analytics/page.tsx
"use client";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";

import { getEmployees } from "@/app/lib/getEmployees";
import { getBookmarks } from "@/app/lib/getBookmarks";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const AnalyticsPage = () => {
  const [departmentRatings, setDepartmentRatings] = useState<any>({});
  const [bookmarkTrends, setBookmarkTrends] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      const employees = await getEmployees();
      const bookmarks = await getBookmarks();

      // Department-wise average rating
      const deptMap: Record<string, number[]> = {};
      employees.forEach((emp: { department: string | number; rating: number; }) => {
        if (!deptMap[emp.department]) deptMap[emp.department] = [];
        deptMap[emp.department].push(emp.rating);
      });

      const ratings: Record<string, number> = {};
      Object.keys(deptMap).forEach((dept) => {
        const avg =
          deptMap[dept].reduce((a, b) => a + b, 0) / deptMap[dept].length;
        ratings[dept] = parseFloat(avg.toFixed(2));
      });

      // Mocked bookmark trends (you can replace with real-time data later)
      const trends = [1, 3, 2, 5, 4, 6]; // Week-wise or day-wise trends

      setDepartmentRatings(ratings);
      setBookmarkTrends(trends);
    }

    fetchData();
  }, []);

  const barData = {
    labels: Object.keys(departmentRatings),
    datasets: [
      {
        label: "Avg Ratings",
        data: Object.values(departmentRatings),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Bookmark Trends",
        data: bookmarkTrends,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Analytics</h1>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Department-wise Avg Ratings</h2>
        <Bar data={barData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-black dark:text-white mb-2">Bookmark Trends</h2>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;

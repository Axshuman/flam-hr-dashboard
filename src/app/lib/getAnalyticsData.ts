// src/lib/getAnalyticsData.ts

import { getEmployees } from "@/app/lib/getEmployees";
import { getBookmarks } from "@/app/lib/getBookmarks";



export async function getAnalyticsData() {
  const employees = await getEmployees();
  const bookmarks = await getBookmarks();

  const bookmarkSet = new Set(bookmarks.map((b: { employeeId: any; }) => b.employeeId));

  // Department-wise average rating
  const departmentRatings: Record<string, number[]> = {};
  employees.forEach((emp: { department: string | number; rating: number; }) => {
    if (!departmentRatings[emp.department]) {
      departmentRatings[emp.department] = [];
    }
    departmentRatings[emp.department].push(emp.rating);
  });

  const avgRatings = Object.keys(departmentRatings).map((dept) => {
    const ratings = departmentRatings[dept];
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return { department: dept, average: parseFloat(avg.toFixed(2)) };
  });

  // Bookmark trends (simulated by total count over 4 weeks)
  const weeklyData = [1, 2, 1, bookmarkSet.size]; // Fake growth data
  const bookmarkTrendData = weeklyData.map((count, index) => ({
    week: `Week ${index + 1}`,
    count,
  }));

  return { avgRatings, bookmarkTrendData };
}

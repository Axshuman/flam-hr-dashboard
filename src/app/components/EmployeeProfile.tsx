// src/app/components/EmployeeProfile.tsx

"use client";

import { useState } from "react";
import Overview from "@/app/components/Tabs/Overview";
import Projects from "@/app/components/Tabs/Projects";
import Feedback from "@/app/components/Tabs/Feedback";

type Tab = "Overview" | "Projects" | "Feedback";

const EmployeeProfile = ({ employee }: { employee: any }) => {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview employee={employee} />;
      case "Projects":
        return <Projects employee={employee} />;
      case "Feedback":
        return <Feedback employee={employee} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-black dark:text-white">{employee.name}</h1>
      <p className="text-md text-gray-700 dark:text-gray-300">{employee.department}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {employee.email} | {employee.phone}
      </p>
      <div className="flex items-center mt-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < employee.rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          Rating: {employee.rating}/5
        </span>
      </div>

      <div className="flex space-x-4 border-b pb-2">
        {(["Overview", "Projects", "Feedback"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === tab
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="pt-4">{renderTabContent()}</div>
    </div>
  );
};

export default EmployeeProfile;

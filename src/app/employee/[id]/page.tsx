// src/app/employee/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Employees } from "@/data/employees";
import Overview from "@/app/components/Tabs/Overview";
import Projects from "@/app/components/Tabs/Projects";
import Feedback from "@/app/components/Tabs/Feedback";

export default function EmployeeDetailPage() {
  const params = useParams();
  const [employee, setEmployee] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("Overview");

  useEffect(() => {
    const id = Number(params.id);
    const emp = Employees.find((e) => e.id === id);
    setEmployee(emp);
  }, [params.id]);

  if (!employee) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{employee.name}</h1>
      <p className="text-gray-600">{employee.department}</p>
      <p className="text-gray-600">{employee.address}</p>
      <p className="text-gray-600">{employee.phone}</p>
      <p className="text-gray-600">{employee.bio}</p>

      <nav className="border-b mb-4">
        <div className="flex space-x-4">
          {["Overview", "Projects", "Feedback"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 ${
                selectedTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div>
        {selectedTab === "Overview" && <Overview employee={employee} />}
        {selectedTab === "Projects" && <Projects employee={employee} />}
        {selectedTab === "Feedback" && <Feedback employee={employee} />}
      </div>
    </div>
  );
}

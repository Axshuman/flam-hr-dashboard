// src/lib/getEmployees.ts

import { Employees } from "@/data/employees"; // Adjust if alias is not configured

export async function getEmployees() {
  return Employees;
}

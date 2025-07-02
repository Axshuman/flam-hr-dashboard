export function getRandomDepartment(seed: number): string {
  const departments = ['Engineering', 'Design', 'Marketing', 'HR', 'Sales'];
  return departments[seed % departments.length];
}

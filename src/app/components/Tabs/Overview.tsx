// src/app/components/Tabs/Overview.tsx

const Overview = ({ employee }: { employee: any }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white">Address</h2>
        <p className="text-gray-700 dark:text-gray-300">{employee.address}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-black dark:text-white">Bio</h2>
        <p className="text-gray-700 dark:text-gray-300">{employee.bio}</p>
      </div>
    </div>
  );
};

export default Overview;

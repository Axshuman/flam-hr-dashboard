// src/app/components/Tabs/Feedback.tsx

const Feedback = ({ employee }: { employee: any }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Feedback</h2>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        {employee.feedback?.map((fb: string, i: number) => (
          <li key={i}>{fb}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;

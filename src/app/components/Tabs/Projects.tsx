// src/app/components/Tabs/Projects.tsx

const Projects = ({ employee }: { employee: any }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Projects</h2>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        {employee.projects?.map((proj: string, i: number) => (
          <li key={i}>{proj}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;

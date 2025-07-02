// src/app/components/BookmarkCard.tsx

"use client";

interface BookmarkCardProps {
  employee: any;
  onRemove: () => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ employee, onRemove }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white">{employee.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{employee.department}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < employee.rating ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 font-medium text-sm"
        >
          Remove Bookmark
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;

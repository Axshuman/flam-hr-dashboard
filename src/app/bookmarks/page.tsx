// src/app/bookmarks/page.tsx
"use client";
import { useState, useEffect } from "react";

const BookmarksPage = () => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookmarks");
    setList(stored ? JSON.parse(stored) : []);
  }, []);

  const remove = (id: number) => {
    const updated = list.filter(u => u.id !== id);
    setList(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const promo = (name: string) => alert(`Promote action on ${name}`);
  const assign = (name: string) => alert(`Assign project action on ${name}`);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
      {list.length === 0 ? <p>No bookmarks.</p> : (
        <div className="space-y-4">
          {list.map(emp => (
            <div key={emp.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{emp.name}</h2>
                <p className="text-gray-600">{emp.department}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < emp.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => remove(emp.id)} className="text-red-500">Remove</button>
                <button onClick={() => promo(emp.name)} className="bg-green-500 text-white px-2 rounded">Promote</button>
                <button onClick={() => assign(emp.name)} className="bg-blue-500 text-white px-2 rounded">Assign</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;

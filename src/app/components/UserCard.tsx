'use client';

import { useRouter } from 'next/navigation';
import StarRating from '@/app/components/StarRating';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
}

export default function UserCard({ user, children }: { user: User; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div
      className="bg-gray-800 p-4 rounded shadow flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <h2 className="text-lg font-bold text-white">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-sm text-gray-300">{user.email}</p>
      <p className="text-sm text-gray-300">Age: {user.age}</p>
      <p className="text-sm text-gray-300">Dept: {user.department}</p>
      <StarRating rating={user.rating} />
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
        >
          View
        </button>
        {children}
      </div>
    </div>
  );
}

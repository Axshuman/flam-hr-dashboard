'use client';

import { useEffect, useState } from 'react';
import { useBookmarks } from '@/app/hooks/useBookmarks';
import { useSearch } from '@/app/hooks/useSearch';
import Filters from '@/app/components/Filters';
import UserCard from '@/app/components/UserCard';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
}

function getRandomDepartment(id: number): string {
  const departments = ['Engineering', 'Design', 'Marketing', 'HR', 'Sales'];
  return departments[id % departments.length];
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState({
    query: '',
    department: [] as string[],
    rating: [] as number[],
  });

  const { bookmarks, addBookmark, isBookmarked } = useBookmarks();
  const { searchTerm, handleSearch, filterBySearch } = useSearch(users, ['firstName', 'lastName', 'email']);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const enhanced = data.users.map((u: any) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          age: u.age,
          department: getRandomDepartment(u.id),
          rating: Math.ceil(Math.random() * 5),
        }));
        setUsers(enhanced);
        setFilteredUsers(enhanced);
      });
  }, []);

  useEffect(() => {
    setFilters(prev => ({ ...prev, query: searchTerm }));
  }, [searchTerm]);

  useEffect(() => {
    const filtered = filterBySearch(users).filter((u: { department: string; rating: number; }) => {
      const matchDept = filters.department.length === 0 || filters.department.includes(u.department);
      const matchRating = filters.rating.length === 0 || filters.rating.includes(u.rating);
      return matchDept && matchRating;
    });
    setFilteredUsers(filtered);
  }, [filters, users]);

  const handleBookmark = (user: User) => {
    if (!isBookmarked(user.id.toString())) {
      addBookmark(user);
      alert(`${user.firstName} bookmarked.`);
    }
  };

  const handleLoginToggle = () => {
    setIsLoggedIn(prev => !prev);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  if (!isLoggedIn) {
    return (
      <main className="flex items-center justify-center h-screen animate-fade-in">
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md text-center transition duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-4">You’re not logged in</h2>
          <button
            onClick={handleLoginToggle}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition-transform duration-200"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6 transition-opacity duration-300">
        <h1 className="text-3xl font-bold">HR Dashboard</h1>
        <button
          onClick={handleLoginToggle}
          className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition-transform duration-200"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full max-w-md mb-4 p-2 border rounded transition-all duration-200"
      />

      <Filters
        filters={filters}
        setFilters={setFilters}
        departments={['Engineering', 'Design', 'Marketing', 'HR', 'Sales']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredUsers.slice(0, visibleCount).map(user => (
          <div key={user.id} className="animate-fade-in transition-transform duration-300">
            <UserCard user={user}>
              <button
                onClick={() => handleBookmark(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:scale-105 transition-transform duration-200"
              >
                {isBookmarked(user.id.toString()) ? 'Bookmarked' : 'Bookmark'}
              </button>
            </UserCard>
          </div>
        ))}
      </div>

      {visibleCount < filteredUsers.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 transition-transform duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  )
}

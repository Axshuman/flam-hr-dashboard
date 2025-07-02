// src/app/hooks/useSearch.ts

import { useState } from 'react';

export function useSearch<T>(data: T[], keys: (keyof T)[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterBySearch = (items: T[]) => {
    if (!searchTerm.trim()) return data;

    return items.filter(item =>
      keys.some(key =>
        String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return {
    searchTerm,
    handleSearch,
    filterBySearch,
  };
}

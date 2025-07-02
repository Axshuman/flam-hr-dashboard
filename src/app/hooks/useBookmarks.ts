// src/hooks/useBookmarks.ts
"use client";

import { useState, useEffect } from "react";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookmarkedEmployees");
    if (stored) setBookmarks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedEmployees", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (employee: any) => {
    if (!bookmarks.find((e) => e.id === employee.id)) {
      setBookmarks([...bookmarks, employee]);
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((e) => e.id !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((e) => e.id === id);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
};

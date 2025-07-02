'use client'

import React from 'react'

type FiltersType = {
  query: string
  department: string[]
  rating: number[] // We'll now store [3] instead of [1, 2, 3]
}

type Props = {
  filters: FiltersType
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  departments: string[]
}

export default function Filters({ filters, setFilters, departments }: Props) {
  const toggleArrayFilter = (
    key: 'department',
    value: string
  ) => {
    const current = filters[key] as string[]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]

    setFilters({
      ...filters,
      [key]: updated
    })
  }

  const handleStarClick = (star: number) => {
    const currentRating = filters.rating[0] || 0
    const newRating = currentRating === star ? 0 : star

    const newRatings = newRating === 0 ? [] : [newRating]
    setFilters({ ...filters, rating: newRatings })
  }

  const currentRating = filters.rating[0] || 0

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, email..."
        value={filters.query}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        className="w-full sm:w-64 border border-gray-300 px-3 py-2 rounded-md"
      />

      {/* Department Filter */}
      <div className="flex gap-2 flex-wrap">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => toggleArrayFilter('department', dept)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              filters.department.includes(dept)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Rating Filter */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            className={`text-2xl transition-colors ${
              star <= currentRating ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}

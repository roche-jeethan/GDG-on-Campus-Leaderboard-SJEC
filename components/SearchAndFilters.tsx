"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortField, SortDirection } from "@/lib/types";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField, direction: SortDirection) => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  sortField,
  sortDirection,
  onSort,
  resultCount,
  totalCount,
}: SearchAndFiltersProps) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(debouncedQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedQuery, onSearchChange]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      onSort(field, newDirection);
    } else {
      onSort(field, "asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const sortOptions: Array<{ field: SortField; label: string }> = [
    { field: "rank", label: "Rank" },
    { field: "name", label: "Name" },
    { field: "score", label: "Score" },
    { field: "skill_badges", label: "Badges" },
    { field: "arcade_games", label: "Games" },
  ];

  return (
    <div className="bg-gray-800 rounded-xl mt-40 shadow-lg p-6 mb-8 border border-gray-700">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={debouncedQuery}
              onChange={(e) => setDebouncedQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg 
                       bg-gray-700 text-white
                       focus:ring-2 focus:ring-google-blue focus:border-transparent
                       transition-colors duration-200"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-400">
              Showing {resultCount} of {totalCount} students
            </p>
          )}
        </div>

        <div className="lg:w-auto">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Sort by:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {sortOptions.map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200
                  ${
                    sortField === field
                      ? "bg-google-blue text-white border-google-blue shadow-md"
                      : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                  }
                `}
              >
                <span className="text-sm font-medium">{label}</span>
                {getSortIcon(field)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import TopThreeSpotlight from "@/components/TopThreeSpotlight";
import StudentCard from "@/components/StudentCard";
import SearchAndFilters from "@/components/SearchAndFilters";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  SkeletonCard,
} from "@/components/LoadingStates";
import { fetchLeaderboardData, searchStudents, sortStudents } from "@/lib/api";
import { Student, SortField, SortDirection } from "@/lib/types";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLeaderboardData();
      setStudents(data);
      setLastFetched(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = searchStudents(students, searchQuery);
    return sortStudents(filtered, sortField, sortDirection);
  }, [students, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={loadData} />;
  }

  const remainingStudents = filteredAndSortedStudents.slice(3);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        totalStudents={students.length}
        lastUpdated={lastFetched || undefined}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopThreeSpotlight students={filteredAndSortedStudents} />

        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          resultCount={filteredAndSortedStudents.length}
          totalCount={students.length}
        />

        {filteredAndSortedStudents.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {remainingStudents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  All Participants
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {remainingStudents.map((student) => (
                    <StudentCard
                      key={`${student.rank}-${student.email}`}
                      student={student}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">🚀 Powered by Google Cloud Study Jams</p>
            <p className="text-sm">
              Celebrating learning and achievement in cloud technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

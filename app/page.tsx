"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import TopThreeSpotlight from "@/components/TopThreeSpotlight";
import StudentCard from "@/components/StudentCard";
import SearchAndFilters from "@/components/SearchAndFilters";
import Confetti, { celebrateTopThree } from "@/components/Confetti";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/LoadingStates";
import {
  useLeaderboard,
  useRefreshLeaderboard,
  searchStudents,
  sortStudents,
} from "@/lib/hooks";
import { SortField, SortDirection } from "@/lib/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  const {
    data: students = [],
    isLoading,
    error,
    dataUpdatedAt,
    isRefetching,
  } = useLeaderboard();

  const refreshMutation = useRefreshLeaderboard();

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = searchStudents(students, searchQuery);
    return sortStudents(filtered, sortField, sortDirection);
  }, [students, searchQuery, sortField, sortDirection]);

  useEffect(() => {
    if (students.length > 0 && !isLoading && !hasTriggeredConfetti) {
      celebrateTopThree();
      setShowConfetti(true);
      setHasTriggeredConfetti(true);
    }
  }, [students.length, isLoading, hasTriggeredConfetti]);

  const handleSort = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleRetry = () => {
    refreshMutation.mutate();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error && !students.length) {
    return <ErrorState onRetry={handleRetry} />;
  }

  const remainingStudents = filteredAndSortedStudents.slice(3);
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : undefined;

  return (
    <div className="min-h-screen bg-gray-900">
      <Confetti
        trigger={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      <Header
        totalStudents={students.length}
        lastUpdated={lastUpdated}
        isRefreshing={isRefetching || refreshMutation.isPending}
        onRefresh={handleRetry}
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
            <p className="mb-2">Powered by Google Cloud Study Jams</p>
            <p className="text-sm">
              Celebrating learning and achievement in cloud technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

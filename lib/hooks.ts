import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Student } from "./types";

const QUERY_KEYS = {
  leaderboard: ["leaderboard"] as const,
  student: (id: string) => ["student", id] as const,
} as const;

async function fetchLeaderboardFromAPI(): Promise<Student[]> {
  const response = await fetch("/api/leaderboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: Student[] = await response.json();
  return data;
}

export function useLeaderboard() {
  return useQuery({
    queryKey: QUERY_KEYS.leaderboard,
    queryFn: fetchLeaderboardFromAPI,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useRefreshLeaderboard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchLeaderboardFromAPI,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.leaderboard, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.leaderboard });
    },
    onError: (error) => {
      console.error("Failed to refresh leaderboard:", error);
    },
  });
}

export function usePrefetchLeaderboard() {
  const queryClient = useQueryClient();

  return () => {
    const existingData = queryClient.getQueryData(QUERY_KEYS.leaderboard);
    if (!existingData) {
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.leaderboard,
        queryFn: fetchLeaderboardFromAPI,
        staleTime: 10 * 60 * 1000,
      });
    }
  };
}

export function searchStudents(students: Student[], query: string): Student[] {
  if (!query.trim()) return students;

  const searchTerm = query.toLowerCase().trim();

  return students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
  );
}

export function sortStudents(
  students: Student[],
  field: "rank" | "name" | "score" | "skill_badges" | "arcade_games",
  direction: "asc" | "desc"
): Student[] {
  return [...students].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (field) {
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      default:
        aValue = a[field];
        bValue = b[field];
        break;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return direction === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });
}

export { QUERY_KEYS };

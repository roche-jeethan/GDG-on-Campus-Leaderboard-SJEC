import { Student } from "./types";

export async function fetchLeaderboardData(): Promise<Student[]> {
  try {
    const response = await fetch("/api/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Student[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw new Error("Failed to fetch leaderboard data");
  }
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

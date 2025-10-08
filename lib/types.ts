export interface Student {
  rank: number;
  name: string;
  email: string;
  profile: string;
  skill_badges: number;
  arcade_games: number;
  score: number;
  last_updated: string;
}

export interface LeaderboardData {
  students: Student[];
  lastFetched: Date;
}

export type SortField =
  | "rank"
  | "name"
  | "score"
  | "skill_badges"
  | "arcade_games";
export type SortDirection = "asc" | "desc";

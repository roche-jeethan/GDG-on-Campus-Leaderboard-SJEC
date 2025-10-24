export const RANK_COLORS = {
  gold: {
    border: "border-yellow-400",
    gradient: "from-yellow-400 via-yellow-300 to-yellow-500",
    text: "text-yellow-400",
    bg: "bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500",
  },
  silver: {
    border: "border-gray-400",
    gradient: "from-gray-300 via-gray-400 to-gray-500",
    text: "text-gray-400",
    bg: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
  },
  bronze: {
    border: "border-amber-700",
    gradient: "from-amber-600 via-amber-700 to-amber-800",
    text: "text-amber-700",
    bg: "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800",
  },
};

export const COMPLETED_GRADIENTS = [
  "from-purple-500 via-purple-400 to-purple-600",
  "from-blue-500 via-blue-400 to-blue-600",
  "from-emerald-500 via-emerald-400 to-emerald-600",
  "from-indigo-500 via-indigo-400 to-indigo-600",
  "from-cyan-500 via-cyan-400 to-cyan-600",
  "from-violet-500 via-violet-400 to-violet-600",
  "from-teal-500 via-teal-400 to-teal-600",
  "from-pink-500 via-pink-400 to-pink-600",
];

export function getCompletedGradient(index: number): string {
  return COMPLETED_GRADIENTS[index % COMPLETED_GRADIENTS.length];
}

export const PARTICIPANT_BORDER_COLORS = [
  "border-blue-500",
  "border-green-500",
  "border-purple-500",
  "border-pink-500",
  "border-cyan-500",
  "border-indigo-500",
  "border-violet-500",
  "border-fuchsia-500",
  "border-rose-500",
  "border-emerald-500",
];

export function getParticipantBorderColor(index: number): string {
  return PARTICIPANT_BORDER_COLORS[index % PARTICIPANT_BORDER_COLORS.length];
}

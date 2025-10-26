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

export const COMPLETED_BORDER = [
  "border-[#4285f4]",
  "border-[#34a853]",
  "border-[#f9ab00]",
  "border-[#ea4335]",  
];

export function getCompletedBorderColor(index: number): string {
  return COMPLETED_BORDER[index % COMPLETED_BORDER.length];
}

export const PARTICIPANT_BORDER_COLORS = [
  "border-[#4285f4]",
  "border-[#34a853]",
  "border-[#f9ab00]",
  "border-[#ea4335]",
];

export function getParticipantBorderColor(index: number): string {
  return PARTICIPANT_BORDER_COLORS[index % PARTICIPANT_BORDER_COLORS.length];
}

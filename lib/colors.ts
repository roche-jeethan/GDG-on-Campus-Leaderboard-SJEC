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

"use client";

import { Student } from "@/lib/types";
import { ExternalLink, Mail, Award, Gamepad2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface StudentCardProps {
  student: Student;
  isTopThree?: boolean;
  position?: "gold" | "silver" | "bronze";
}

export default function StudentCard({
  student,
  isTopThree = false,
  position,
}: StudentCardProps) {
  const getPositionStyles = () => {
    if (!isTopThree) return "";

    switch (position) {
      case "gold":
        return "bg-gradient-google-yellow shadow-google-yellow";
      case "silver":
        return "bg-gradient-silver shadow-silver";
      case "bronze":
        return "bg-gradient-bronze shadow-bronze";
      default:
        return "";
    }
  };

  const getPositionIcon = () => {
    if (!isTopThree) return null;

    const iconClass = "h-6 w-6 text-white";
    switch (position) {
      case "gold":
        return <Award className={`${iconClass} drop-shadow-lg`} />;
      case "silver":
        return <Award className={`${iconClass} drop-shadow-lg`} />;
      case "bronze":
        return <Award className={`${iconClass} drop-shadow-lg`} />;
      default:
        return null;
    }
  };

  const getRankDisplay = () => {
    if (isTopThree) {
      return (
        <div
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-white font-bold ${getPositionStyles()}`}
        >
          {getPositionIcon()}
          <span>#{student.rank}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-google-blue rounded-full text-white font-bold text-lg shadow-lg">
        {student.rank}
      </div>
    );
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const lastUpdated = new Date(student.last_updated);

  return (
    <div
      className={`
      relative bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
      transition-all duration-300 transform hover:-translate-y-1 border border-gray-700
      ${isTopThree ? "ring-2 ring-opacity-50" : ""}
      ${position === "gold" ? "ring-google-yellow" : ""}
      ${position === "silver" ? "ring-gray-400" : ""}
      ${position === "bronze" ? "ring-amber-600" : ""}
    `}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {getRankDisplay()}

          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard(student.email)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
              title="Copy email"
            >
              <Mail className="h-4 w-4 text-gray-300" />
            </button>

            <a
              href={student.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-google-blue hover:bg-blue-600 transition-colors duration-200"
              title="View profile"
            >
              <ExternalLink className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">
            {student.name}
          </h3>
          <p className="text-sm text-gray-300 truncate">{student.email}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Award className="h-4 w-4 text-google-blue mr-1" />
            </div>
            <div className="text-xl font-bold text-white">
              {student.skill_badges}
            </div>
            <div className="text-xs text-gray-400">Badges</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Gamepad2 className="h-4 w-4 text-google-green mr-1" />
            </div>
            <div className="text-xl font-bold text-white">
              {student.arcade_games}
            </div>
            <div className="text-xs text-gray-400">Games</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-google-red to-google-blue bg-clip-text text-transparent">
              {student.score}
            </div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
        </div>

        <div className="flex items-center justify-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
          </span>
        </div>
      </div>

      {isTopThree && (
        <div
          className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${getPositionStyles()} flex items-center justify-center shadow-lg`}
        >
          {getPositionIcon()}
        </div>
      )}
    </div>
  );
}

"use client";

import { Student } from "@/lib/types";
import { Trophy, Award, Gamepad2, CheckCircle } from "lucide-react";
import { getCompletedGradient } from "@/lib/colors";

interface CompletedListProps {
  students: Student[];
}

export default function CompletedList({ students }: CompletedListProps) {
  if (students.length === 0) return null;

  function getParticipantBorderColor(rank: number) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-3xl">Course Completed - Hall of Fame</h2>
        </div>
        <p className="text-gray-300 text-lg">
          {students.length} participant{students.length !== 1 ? "s" : ""}{" "}
          achieved the perfect score! 🎉
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <div
            key={`completed-${student.email}`}
            className={`relative bg-gray-800rounded-xl shadow-lg border-white/20 overflow-hidden group hover:scale-105 transition-transform duration-300 border-2 ${getCompletedGradient(student.rank)}`}
          >
            <div className="absolute top-0 right-0 bg-google-yellow text-gray-900 px-3 py-1 rounded-bl-lg font-bold text-sm flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              COMPLETED
            </div>

            <div className="p-6 pt-10">
              <div className="text-center mb-4">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-google-yellow to-google-green flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 truncate">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-300 truncate">
                  {student.email}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Award className="h-4 w-4 text-google-blue" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {student.skill_badges}
                    </div>
                    <div className="text-xs text-gray-300">Badges</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Gamepad2 className="h-4 w-4 text-google-green" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {student.arcade_games}
                    </div>
                    <div className="text-xs text-gray-300">Games</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className="h-4 w-4 text-google-yellow" />
                    </div>
                    <div className="text-3xl font-bold text-google-yellow">
                      {student.score}
                    </div>
                    <div className="text-xs text-gray-300">Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

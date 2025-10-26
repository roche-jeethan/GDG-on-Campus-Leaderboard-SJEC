"use client";

import { Student } from "@/lib/types";
import { Trophy, Award, Gamepad2, CheckCircle } from "lucide-react";
import { getCompletedBorderColor } from "@/lib/colors";

interface CompletedListProps {
  students: Student[];
}

export default function CompletedList({ students }: CompletedListProps) {
  if (students.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-google-yellow" />
          <h2 className="text-3xl text-gray-300 bg-clip-text">
            Course Completed - Hall of Fame
          </h2>
          <Trophy className="h-8 w-8 text-google-yellow" />
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
            className={`
              relative bg-gray-800 rounded-xl shadow-lg overflow-hidden 
              group hover:scale-105 transition-transform duration-300 
              border-2 ${getCompletedBorderColor(index)}
            `}
          >
            <div className="absolute top-0 right-0 bg-google-yellow text-white px-3 py-1 rounded-bl-lg font-bold text-sm flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-white" />
              {/* COMPLETED */}
            </div>

            <div className="p-6 pt-10">
              <div className="text-center mb-4">
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
                    <Award className="h-4 w-4 text-google-blue mx-auto mb-1" />
                    <div className="text-2xl font-bold text-white">
                      {student.skill_badges}
                    </div>
                    <div className="text-xs text-gray-300">Badges</div>
                  </div>
                  <div>
                    <Gamepad2 className="h-4 w-4 text-google-green mx-auto mb-1" />
                    <div className="text-2xl font-bold text-white">
                      {student.arcade_games}
                    </div>
                    <div className="text-xs text-gray-300">Games</div>
                  </div>
                  <div>
                    <Trophy className="h-4 w-4 text-google-yellow mx-auto mb-1" />
                    <div className="text-2xl font-bold text-google-yellow">
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

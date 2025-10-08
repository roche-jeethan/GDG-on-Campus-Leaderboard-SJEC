"use client";

import { Student } from "@/lib/types";
import { Crown, Award, Medal } from "lucide-react";

interface TopThreeSpotlightProps {
  students: Student[];
}

export default function TopThreeSpotlight({
  students,
}: TopThreeSpotlightProps) {
  const topThree = students.slice(0, 3);

  if (topThree.length === 0) return null;

  const getPositionConfig = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bgGradient: "bg-gradient-primary",
          icon: <Crown className="h-8 w-8 text-amber-400" />,
          title: "First",
          ringColor: "ring-amber-400",
          height: "h-72",
          order: "order-1",
        };
      case 2:
        return {
          bgGradient: "bg-gradient-silver",
          icon: <Award className="h-6 w-6 text-gray-400" />,
          title: "Second",
          ringColor: "ring-gray-400",
          height: "h-64",
          order: "order-2",
        };
      case 3:
        return {
          bgGradient: "bg-gradient-bronze",
          icon: <Medal className="h-6 w-6 text-amber-700" />,
          title: "Third",
          ringColor: "ring-amber-600",
          height: "h-56",
          order: "order-3",
        };
      default:
        return {
          bgGradient: "bg-gradient-google-blue",
          icon: <Award className="h-6 w-6 text-google-blue" />,
          title: "Top Performer",
          ringColor: "ring-google-blue",
          height: "h-48",
          order: "order-last",
        };
    }
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-google-yellow via-google-red to-google-blue bg-clip-text text-transparent mb-4">
          🏆 Top Performers 🏆
        </h2>
        <p className="text-gray-300 text-lg">
          Celebrating our leading Cloud Study Jams participants
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-end justify-center sm:gap-4 gap-8 lg:gap-12 gap-y-32 px-4">
        {topThree.map((student) => {
          const config = getPositionConfig(student.rank);

          return (
            <div
              key={student.rank}
              className={`${config.order} w-full max-w-sm mx-auto lg:mx-0`}
            >
              <div
                className={`
                ${config.height} ${config.bgGradient} rounded-3xl p-8 
                shadow-2xl transform hover:scale-105 transition-all duration-300
                ring-4 ${config.ringColor}
              `}
              >
                <div className="text-center h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-center">{config.icon}</div>
                    <div className="text-white font-bold text-xl">
                      {config.title}
                    </div>
                    <div className="text-white/90 text-base">
                      Rank #{student.rank}
                    </div>
                  </div>

                  <div className="bg-white/25 backdrop-blur-sm rounded-xl p-6 text-gray-100 space-y-4">
                    <div>
                      <div className="font-bold text-xl mb-2 truncate">
                        {student.name}
                      </div>
                      <div className="text-sm opacity-90 truncate">
                        {student.email}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-2xl mb-1">
                          {student.skill_badges}
                        </div>
                        <div className="opacity-80">Badges</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-2xl mb-1">
                          {student.arcade_games}
                        </div>
                        <div className="opacity-80">Arcade Games</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-3xl mb-1">
                          {student.score}
                        </div>
                        <div className="opacity-80">Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

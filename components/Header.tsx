"use client";

import { Trophy, Users } from "lucide-react";

interface HeaderProps {
  totalStudents: number;
  lastUpdated?: Date;
}

export default function Header({ totalStudents, lastUpdated }: HeaderProps) {
  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-google-blue to-google-green rounded-xl shadow-lg">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-google-blue">Cloud</span>{" "}
                  <span className="text-google-green">Study</span>{" "}
                  <span className="text-google-yellow">Jams</span>
                </h1>
                <p className="text-lg font-semibold text-gray-300">
                  Leaderboard
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-google-blue" />
                <span className="text-white">{totalStudents} Students</span>
              </div>
              {lastUpdated && (
                <div className="text-xs text-gray-400">
                  Last updated: {lastUpdated.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sm:hidden pb-3 flex items-center justify-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-google-blue" />
            <span className="text-white">{totalStudents} Students</span>
          </div>
          {lastUpdated && (
            <div className="text-xs text-gray-400">
              Updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";
import GDGlogo from "./Icon";
import { Users, RefreshCw } from "lucide-react";

interface HeaderProps {
  totalStudents: number;
  lastUpdated?: Date;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export default function Header({
  totalStudents,
  lastUpdated,
  isRefreshing = false,
  onRefresh,
}: HeaderProps) {
  return (
    <header className="bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-google-blue to-google-green rounded-xl shadow-lg">
                <GDGlogo />
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

              {/* {onRefresh && (
                <button
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-google-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  title="Refresh data"
                >
                  <RefreshCw
                    className={`h-3 w-3 text-white ${
                      isRefreshing ? "animate-spin" : ""
                    }`}
                  />
                  <span className="text-xs text-white">
                    {isRefreshing ? "Refreshing..." : "Refresh"}
                  </span>
                </button>
              )} */}

              {lastUpdated && (
                <div className="text-xs text-gray-400">
                  Last updated: {lastUpdated.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sm:hidden pb-3 flex flex-col items-center space-y-2 text-sm text-gray-300">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-google-blue" />
              <span className="text-white">{totalStudents} Students</span>
            </div>

            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-google-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Refresh data"
              >
                <RefreshCw
                  className={`h-3 w-3 text-white ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                <span className="text-xs text-white">
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </span>
              </button>
            )}
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

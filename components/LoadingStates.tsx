"use client";

import { Trophy, Users, Award, Gamepad2 } from "lucide-react";
import GDGlogo from "./Icon";

export function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-bounce mb-8 flex items-center justify-center">
          <GDGlogo/>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Loading Leaderboard
        </h2>

        <p className="text-gray-400 mb-8">
          Fetching the latest student progress...
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-lg p-4 shadow-lg animate-pulse"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-6 bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <div className="w-6 h-6 bg-gray-600 rounded mx-auto mb-1"></div>
            <div className="h-6 bg-gray-600 rounded mb-1"></div>
            <div className="h-3 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>

      <div className="h-4 bg-gray-700 rounded"></div>
    </div>
  );
}

interface ErrorStateProps {
  onRetry?: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-16 h-16 bg-google-red rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h2>

        <p className="text-gray-400 mb-8">
          We couldn't load the leaderboard data. Please check your internet
          connection and try again.
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-google-blue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <Users className="h-16 w-16 text-gray-400 mx-auto" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-4">
        No students found
      </h3>

      <p className="text-gray-400">
        Try adjusting your search criteria or check back later.
      </p>
    </div>
  );
}

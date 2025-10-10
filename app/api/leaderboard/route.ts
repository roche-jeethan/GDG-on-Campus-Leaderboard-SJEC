import { NextResponse } from "next/server";
import { Student } from "@/lib/types";
import { env } from "process";

const API_URL = env.API_URL;
// const API_URL =
//   "https://script.google.com/macros/s/AKfycbwNWNfW6lWgVYK1otJCugSNv5pvG9wp1-6vXODPbmsHPgf3xV5ZdcoDTgpP_QqI8l0/exec";

let cachedData: Student[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

function dataHasChanged(
  newData: Student[],
  oldData: Student[] | null
): boolean {
  if (!oldData || newData.length !== oldData.length) return true;

  return JSON.stringify(newData) !== JSON.stringify(oldData);
}

export async function GET() {
  try {
    if (!API_URL) {
      return NextResponse.json(
        { error: "API_URL is not configured" },
        { status: 500 }
      );
    }

    const now = Date.now();
    const shouldFetch = !cachedData || now - lastFetchTime > CACHE_DURATION;

    if (!shouldFetch) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=150",
          "X-Cache": "HIT",
        },
      });
    }

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (cachedData) {
        return NextResponse.json(cachedData, {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=150",
            "X-Cache": "STALE",
          },
        });
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Student[] = await response.json();
    const sortedData = data.sort((a, b) => a.rank - b.rank);

    if (dataHasChanged(sortedData, cachedData)) {
      cachedData = sortedData;
      lastFetchTime = now;

      return NextResponse.json(sortedData, {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=150",
          "X-Cache": "MISS",
          "X-Data-Changed": "true",
        },
      });
    }

    return NextResponse.json(cachedData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=150",
        "X-Cache": "HIT",
        "X-Data-Changed": "false",
      },
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);

    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
          "X-Cache": "ERROR-FALLBACK",
        },
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}

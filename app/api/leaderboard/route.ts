import { NextResponse } from "next/server";
import { Student } from "@/lib/types";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwNWNfW6lWgVYK1otJCugSNv5pvG9wp1-6vXODPbmsHPgf3xV5ZdcoDTgpP_QqI8l0/exec";

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Student[] = await response.json();
    const sortedData = data.sort((a, b) => a.rank - b.rank);

    return NextResponse.json(sortedData);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}

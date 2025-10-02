import { NextResponse } from "next/server";

interface GrazPicsResponse {
  data: unknown;
}

export async function GET() {
  try {
    const response = await fetch(
      "https://directus-twoc08g80owskccsgcw04cgg.s.solvro.pl/items/graz_pics",
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${String(response.status)}`);
    }

    const data = (await response.json()) as GrazPicsResponse;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return NextResponse.json(
      { error: "Failed to fetch carousel images" },
      { status: 500 },
    );
  }
}

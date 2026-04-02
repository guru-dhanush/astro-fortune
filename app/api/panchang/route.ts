import { NextResponse } from "next/server";

export async function GET() {
  try {

    const token = process.env.ASTROLOGY_API_TOKEN;

    const today = new Date();

    const body = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      hour: today.getHours(),
      min: today.getMinutes(),
      lat: 28.6139,
      lon: 77.2090,
      tzone: 5.5
    };

    const response = await fetch(
      "https://json.astrologyapi.com/v1/advanced_panchang",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-astrologyapi-key": token as string
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json({
      error: "Failed to fetch Panchang"
    });

  }
}
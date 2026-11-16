import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "janusezam";

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
      headers: {
        "User-Agent": "Portfolio-App",
        Accept: "application/json",
      },
      next: { revalidate: 1800 }, // Cache on server for 30 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned status ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}


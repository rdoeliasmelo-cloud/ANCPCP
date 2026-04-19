import { competitionService } from "@ancpcp/shared";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const roundId = url.searchParams.get("roundId") ?? "rnd-2";
  const leaderboard = competitionService.recalculate(roundId);
  return NextResponse.json({ items: leaderboard });
}

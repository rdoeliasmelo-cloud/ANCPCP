import { competitionService } from "@ancpcp/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { roundId } = await request.json();
  const leaderboard = competitionService.recalculate(roundId);
  return NextResponse.json({ items: leaderboard });
}

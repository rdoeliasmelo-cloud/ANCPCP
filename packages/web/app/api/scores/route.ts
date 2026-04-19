import { competitionService } from "@ancpcp/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const scoreEntry = competitionService.saveScore(body);
  return NextResponse.json(scoreEntry, { status: 201 });
}

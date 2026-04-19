import { competitionService } from "@ancpcp/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const participant = competitionService.registerParticipant(body);
  return NextResponse.json(participant, { status: 201 });
}

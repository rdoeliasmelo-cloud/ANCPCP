import { competitionService } from "@ancpcp/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const event = competitionService.createEvent(body);
  return NextResponse.json(event, { status: 201 });
}

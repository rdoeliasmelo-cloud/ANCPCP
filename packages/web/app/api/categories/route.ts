import { competitionService } from "@ancpcp/shared";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const category = competitionService.createCategory(body);
  return NextResponse.json(category, { status: 201 });
}

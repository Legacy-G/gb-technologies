import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "GB Technologies Decoupled API Gateway",
    timestamp: new Date().toISOString(),
  });
}

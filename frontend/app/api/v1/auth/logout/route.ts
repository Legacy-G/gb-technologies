import { NextResponse } from "next/server";

export async function POST() {
  try {
    try {
      const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/auth/logout/";
      await fetch(djangoUrl, { method: "POST", signal: AbortSignal.timeout(1500) });
    } catch {
      // Backend offline -> proceed to clear cookies
    }

    const response = NextResponse.json({ message: "Successfully logged out" });
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  } catch {
    const response = NextResponse.json({ message: "Successfully logged out" });
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
}

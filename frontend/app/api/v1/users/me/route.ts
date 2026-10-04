import { NextResponse } from "next/server";

export async function GET() {
  try {
    try {
      const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/users/me/";
      const djangoRes = await fetch(djangoUrl, { signal: AbortSignal.timeout(1500) });
      if (djangoRes.ok) {
        const data = await djangoRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Offline fallback
    }

    return NextResponse.json({
      username: "executive_client",
      email: "executive@vancecapital.com",
      first_name: "Marcus",
      last_name: "Vance",
      profile: {
        company: "Vance Capital Partners",
        country: "United States",
        phone_number: "+1 (555) 234-5678",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "User profile unavailable" }, { status: 500 });
  }
}

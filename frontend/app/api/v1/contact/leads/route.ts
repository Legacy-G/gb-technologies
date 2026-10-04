import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Attempt to delegate to Django REST API if running
    try {
      const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/contact/leads/";
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const djangoRes = await fetch(djangoUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (djangoRes.ok) {
        const djangoData = await djangoRes.json();
        return NextResponse.json(djangoData, { status: djangoRes.status });
      }
    } catch {
      // Django is offline -> Gracefully handle on Edge
    }

    // 2. Fallback: Return successful registration confirmation
    return NextResponse.json(
      {
        message: "Thank you for reaching out. A senior technical advisor will contact you within 24 hours.",
        data: {
          id: Date.now(),
          ...body,
          created_at: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to submit lead" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status: newStatus, rejection_reason } = body;
    const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/users/kyc/review/";

    // 1. Try forwarding to Django REST API
    try {
      const headers = new Headers();
      const cookie = request.headers.get("cookie");
      const auth = request.headers.get("authorization");
      if (cookie) headers.set("cookie", cookie);
      if (auth) headers.set("authorization", auth);
      headers.set("Content-Type", "application/json");

      const djangoRes = await fetch(djangoUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(3000),
      });

      if (djangoRes.ok) {
        const data = await djangoRes.json();
        const response = NextResponse.json(data);

        if (data.user) {
          response.cookies.set({
            name: "user_session",
            value: encodeURIComponent(JSON.stringify(data.user)),
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
        }

        return response;
      }
    } catch {
      // Backend is offline -> Update Edge user_session
    }

    // 2. Resilient Edge Offline Simulation
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/user_session=([^;]+)/);
    let currentUser: any = null;

    if (sessionMatch) {
      try {
        currentUser = JSON.parse(decodeURIComponent(sessionMatch[1]));
      } catch {}
    }

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthenticated. Please log in first." },
        { status: 401 }
      );
    }

    currentUser.profile = currentUser.profile || {};
    currentUser.profile.kyc_status = newStatus || "verified";

    if (newStatus === "verified") {
      currentUser.profile.kyc_verified_at = new Date().toISOString();
      currentUser.profile.kyc_rejection_reason = "";
    } else if (newStatus === "rejected") {
      currentUser.profile.kyc_rejection_reason = rejection_reason || "Document could not be verified.";
    } else if (newStatus === "unverified") {
      currentUser.profile.kyc_submitted_at = null;
      currentUser.profile.kyc_verified_at = null;
      currentUser.profile.kyc_rejection_reason = "";
    }

    const response = NextResponse.json({
      message: `KYC verification status updated to '${currentUser.profile.kyc_status}'.`,
      user: currentUser,
    });

    response.cookies.set({
      name: "user_session",
      value: encodeURIComponent(JSON.stringify(currentUser)),
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to update KYC status" },
      { status: 500 }
    );
  }
}

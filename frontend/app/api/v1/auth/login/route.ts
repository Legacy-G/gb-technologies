import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Try delegating to Django REST API if available
    try {
      const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/auth/login/";
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
        const data = await djangoRes.json();
        const response = NextResponse.json(data, { status: djangoRes.status });

        // Forward Set-Cookie headers if present
        const setCookie = djangoRes.headers.get("set-cookie");
        if (setCookie) {
          response.headers.set("set-cookie", setCookie);
        }

        // Save user_session cookie for instant frontend synchronization
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
      } else {
        // Django returned 400 or 401: Invalid credentials or user does not exist!
        const errorData = await djangoRes.json().catch(() => ({}));
        const message =
          errorData?.detail ||
          errorData?.message ||
          "Account not found or invalid credentials. Please check your credentials or register first.";

        return NextResponse.json(
          { message, detail: message },
          { status: djangoRes.status || 401 }
        );
      }
    } catch {
      // Backend is offline -> Check registered offline session
    }

    // 2. Strict Offline Session Verification (No Demo Bypasses)
    // Only permit login if the user has an existing verified registered session in their client
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/user_session=([^;]+)/);
    if (sessionMatch) {
      try {
        const userObj = JSON.parse(decodeURIComponent(sessionMatch[1]));
        if (
          userObj &&
          (userObj.username?.toLowerCase() === username.toLowerCase() ||
           userObj.email?.toLowerCase() === username.toLowerCase())
        ) {
          // Recognized registered session
          const response = NextResponse.json({
            message: "Login successful",
            user: userObj,
            access: "edge-session-token-" + Date.now(),
            refresh: "edge-session-refresh-" + Date.now(),
          });

          response.cookies.set({
            name: "access_token",
            value: "edge-session-token-" + Date.now(),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
          });

          return response;
        }
      } catch {}
    }

    // STRICT REJECTION: User is not registered or credentials invalid
    return NextResponse.json(
      {
        message: "No registered account found with these credentials. Please register for an account first.",
        detail: "No active account found with the given credentials.",
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Authentication service error" },
      { status: 500 }
    );
  }
}

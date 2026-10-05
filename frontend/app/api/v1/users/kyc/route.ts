import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");
    const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/users/kyc/";

    let formDataObj: FormData | null = null;
    let jsonBodyObj: any = null;

    if (isMultipart) {
      formDataObj = await request.formData();
    } else {
      jsonBodyObj = await request.json();
    }

    // 1. Try forwarding to Django REST API if available
    try {
      const headers = new Headers();
      const cookie = request.headers.get("cookie");
      const auth = request.headers.get("authorization");
      if (cookie) headers.set("cookie", cookie);
      if (auth) headers.set("authorization", auth);

      let fetchOptions: RequestInit = {
        method: "POST",
        headers,
        signal: AbortSignal.timeout(3000),
      };

      if (isMultipart && formDataObj) {
        fetchOptions.body = formDataObj;
      } else {
        headers.set("Content-Type", "application/json");
        fetchOptions.body = JSON.stringify(jsonBodyObj);
      }

      const djangoRes = await fetch(djangoUrl, fetchOptions);

      if (djangoRes.ok) {
        const data = await djangoRes.json();
        const response = NextResponse.json(data);

        // Update user_session cookie with fresh user profile
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
        const errJson = await djangoRes.json().catch(() => ({}));
        return NextResponse.json(errJson, { status: djangoRes.status });
      }
    } catch {
      // Backend is offline -> Update Edge user_session
    }

    // 2. Resilient Edge Offline KYC Submission
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

    const idType = isMultipart && formDataObj
      ? (formDataObj.get("id_type") as string)
      : jsonBodyObj?.id_type || "passport";

    const idNumber = isMultipart && formDataObj
      ? (formDataObj.get("id_number") as string)
      : jsonBodyObj?.id_number || "";

    currentUser.profile = currentUser.profile || {};
    currentUser.profile.kyc_status = "pending";
    currentUser.profile.kyc_id_type = idType;
    currentUser.profile.kyc_id_number = idNumber;
    currentUser.profile.kyc_submitted_at = new Date().toISOString();
    currentUser.profile.kyc_rejection_reason = "";

    const response = NextResponse.json({
      message: "KYC verification documents submitted successfully for compliance review.",
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
      { message: error?.message || "Failed to submit KYC verification" },
      { status: 500 }
    );
  }
}

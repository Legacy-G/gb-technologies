import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // 1. Try delegating to Django REST API if available
    try {
      const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/users/me/";
      const headers = new Headers();
      const cookie = request.headers.get("cookie");
      const auth = request.headers.get("authorization");
      if (cookie) headers.set("cookie", cookie);
      if (auth) headers.set("authorization", auth);
      headers.set("Content-Type", "application/json");

      const djangoRes = await fetch(djangoUrl, {
        headers,
        signal: AbortSignal.timeout(2000),
      });

      if (djangoRes.ok) {
        const data = await djangoRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Backend is offline -> Fall back to local session cookie
    }

    // 2. Read from user_session cookie if present
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/user_session=([^;]+)/);
    if (sessionMatch) {
      try {
        const decoded = decodeURIComponent(sessionMatch[1]);
        const userObj = JSON.parse(decoded);
        if (userObj && (userObj.username || userObj.email)) {
          return NextResponse.json(userObj);
        }
      } catch {
        // Fall through
      }
    }

    // 3. No authenticated session found -> Return 401
    return NextResponse.json(
      { message: "Authentication required. Please sign in." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || "User profile unavailable" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");
    const djangoUrl = process.env.DJANGO_API_URL || "http://127.0.0.1:8000/api/v1/users/me/";

    let reqBody: any;
    let formDataObj: FormData | null = null;
    let jsonBodyObj: any = null;

    if (isMultipart) {
      formDataObj = await request.formData();
    } else {
      jsonBodyObj = await request.json();
    }

    // 1. Forward to Django REST API if available
    try {
      const headers = new Headers();
      const cookie = request.headers.get("cookie");
      const auth = request.headers.get("authorization");
      if (cookie) headers.set("cookie", cookie);
      if (auth) headers.set("authorization", auth);

      let fetchOptions: RequestInit = {
        method: "PATCH",
        headers,
        signal: AbortSignal.timeout(3000),
      };

      if (isMultipart && formDataObj) {
        // Fetch will automatically set correct multipart/form-data boundary
        fetchOptions.body = formDataObj;
      } else {
        headers.set("Content-Type", "application/json");
        fetchOptions.body = JSON.stringify(jsonBodyObj);
      }

      const djangoRes = await fetch(djangoUrl, fetchOptions);

      if (djangoRes.ok) {
        const updatedUser = await djangoRes.json();
        const response = NextResponse.json(updatedUser);

        // Synchronize updated user in user_session cookie
        response.cookies.set({
          name: "user_session",
          value: encodeURIComponent(JSON.stringify(updatedUser)),
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return response;
      } else {
        const errJson = await djangoRes.json().catch(() => ({}));
        return NextResponse.json(errJson, { status: djangoRes.status });
      }
    } catch {
      // Backend is offline -> update local Edge user_session
    }

    // 2. Resilient Offline Edge Session Update
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

    // Extract updates from formData or JSON
    const updates: any = jsonBodyObj || {};
    if (isMultipart && formDataObj) {
      formDataObj.forEach((val, key) => {
        if (typeof val === "string") {
          updates[key] = val;
        }
      });

      // Handle image file if uploaded offline
      const imageFile = formDataObj.get("profile_image") as File | null;
      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${imageFile.type || "image/png"};base64,${buffer.toString("base64")}`;
        updates.profile_image_url = base64;
      }
    }

    // Merge into currentUser
    if (updates.first_name !== undefined) currentUser.first_name = updates.first_name;
    if (updates.last_name !== undefined) currentUser.last_name = updates.last_name;
    if (updates.email !== undefined) currentUser.email = updates.email;

    currentUser.profile = currentUser.profile || {};
    if (updates.company !== undefined) currentUser.profile.company = updates.company;
    if (updates.job_title !== undefined) currentUser.profile.job_title = updates.job_title;
    if (updates.bio !== undefined) currentUser.profile.bio = updates.bio;
    if (updates.phone_number !== undefined) currentUser.profile.phone_number = updates.phone_number;
    if (updates.country !== undefined) currentUser.profile.country = updates.country;
    if (updates.profile_image_url !== undefined) currentUser.profile.profile_image_url = updates.profile_image_url;

    // Handle nested profile object if passed via JSON
    if (updates.profile && typeof updates.profile === "object") {
      Object.assign(currentUser.profile, updates.profile);
    }

    const response = NextResponse.json(currentUser);
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
      { message: error?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return PATCH(request);
}

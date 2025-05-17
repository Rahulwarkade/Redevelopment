import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Add request ID for tracing
  const requestId = crypto.randomUUID();
  requestHeaders.set("x-request-id", requestId);

  // Log request information
  console.log(
    `[Middleware] ${request.method} ${request.url} - RequestID: ${requestId}`
  );

  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ["/signup","/login"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check for auth token in cookies
  const authToken = request.cookies.get("authToken")?.value;

  // Authentication logic
  if (authToken) {
    // User is authenticated

    // If user is trying to access login page but already authenticated,
    // redirect to home page
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // User is not authenticated

    // If user is trying to access a protected route without authentication,
    // redirect to login page
    if (!isPublicRoute) {
      // Store the original URL to redirect back after login
      const url = new URL("/login", request.url);
      // url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }

  // CORS handling
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  // Continue the request with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};

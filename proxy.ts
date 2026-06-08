import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//NextResponse contains obj like URL,Cookies,Headers,Query Parameters
//Before anyone enters the dashboard, check if they're logged in
export async function proxy(request: NextRequest) {
    const auth = request.cookies.get("auth");
  
    //request.nextUrl.pathname -> get current path name -> /dashboard/settings & checks if the path name begins with dashboard
    if (!auth && request.nextUrl.pathname.startsWith("/dashboard")) {
        //NextResponse.redirect -> changes the browser Url and sends user to a new location
        //new URl -> syntax new URL(url, base)
        //let baseUrl = "https://developer.mozilla.org"; 
        // let a = new URL("/", baseUrl);

        return NextResponse.redirect(new URL("login", request.url));
        //if user is not authenticates then redirect to '/login' page 
        //new URL("login", request.url) current site http://localhost:3000 becomes to 
        //http://localhost:3000/login
    }
    //if the user has auth= true then continue as path '/dashboard'
    return NextResponse.next();
}

//runs this proxy in the dashboard routes only eg:-/dashboard/users/123 any path after the /dashboard
export const config = {
    matcher: ["/dashboard/:path*"],
};

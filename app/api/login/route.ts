import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const { email, password } = await request.json();

    //demo credentials
    if (email === 'test@test.com' && password === 'pas123') {
        const response = NextResponse.json({
            message: 'Login successful',
        });

        //if email(ture) && password(ture) then add cookie to response
        // Set a cookie (for demonstration purposes, not secure) name: auth, value: true, httpOnly: true,{prevents javascript from reading the cookie} path: '/'
        response.cookies.set('auth', 'true', {
            httpOnly: true,
            path: '/',
        });
        return response;
    }

    return NextResponse.json(
        { message: 'Invalid credentials',}, { status: 401 });
}
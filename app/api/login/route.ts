import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    //demo credentials
    if (email === 'test@test.com' && password === 'pas123') {
        const response = NextResponse.json({
            message: 'Login successful',
        });

        // Set a cookie (for demonstration purposes, not secure)
        response.cookies.set('auth', 'true', {
            httpOnly: true,
            path: '/',
        });
        return response;
    }

    return NextResponse.json(
        { message: 'Invalid credentials',}, { status: 401 });
}
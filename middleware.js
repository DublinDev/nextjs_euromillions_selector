import { NextResponse } from 'next/server';

export function middleware(request) {
    const basicAuth = request.headers.get('authorization');

    if (basicAuth) {
        const auth = basicAuth.split(' ')[1];
        const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

        const username = process.env.BASIC_AUTH_USERNAME;
        const password = process.env.BASIC_AUTH_PASSWORD;

        if (user === username && pwd === password) {
            return NextResponse.next();
        }
    }

    // If no authorization header is present or credentials are wrong
    return new Response('Authorization required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
}

// Optionally, apply the middleware to specific routes
export const config = {
    matcher: ['/api/:path*', '/'],
};

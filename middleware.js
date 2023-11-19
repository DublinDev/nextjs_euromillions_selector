// import { NextResponse } from 'next/server'

// export const config = {
//     matcher: [
//         '/',
//         '/pages/api/:path'
//     ],
// }

// export function middleware(req) {
//     const basicAuth = req.headers.get('authorization')
//     const url = req.nextUrl

//     console.log('Executing');
//     console.log(`NextUrl: ${url}`);
//     if (basicAuth) {
//         const authValue = basicAuth.split(' ')[1]
//         const [user, pwd] = atob(authValue).split(':')

//         if (user === 'a' && pwd === 'pw') {
//             // if (user === process.env.BASIC_AUTH_PASSWORD && pwd === process.env.BASIC_AUTH_PASSWORD) {
//             return NextResponse.next()
//         }
//     }
//     url.pathname = '/api/auth'

//     return NextResponse.rewrite(url)
// }


// middleware.js

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

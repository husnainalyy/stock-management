import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET || '';

export const config = {
    matcher: [
        '/auth/signIn',
        '/dashboard/:path*',
        '/',
    ],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret });
    const url = request.nextUrl;

    if (token && (url.pathname.startsWith('/auth/signIn') || url.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

"use client";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {toast} from "react-hot-toast";

export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    const isPublicPath = currentPath === '/' || currentPath === '/login' || currentPath === '/signup';

    const token = request.cookies.get('token')?.value || '';

    if(isPublicPath && token) {
        const response = NextResponse.redirect(new URL('/profile', request.nextUrl));
        toast('Already Logged In', {
            icon: '⚠',
        });

        console.log('Already Logged In')


        return response;
    }

    if(!isPublicPath && !token) {
        toast('Please Login to access this page', {
            icon: '⚠',
        });


        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/login',
        '/signup'
    ]
}
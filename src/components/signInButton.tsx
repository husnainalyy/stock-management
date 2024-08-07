"use client"
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const SignInButton = () => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status, router]);

    return (
        <>
            { status === 'unauthenticated' && (
                <button onClick={() => signIn('google')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Sign in with Google
                </button>
            )}
        </>
    );
};

export default SignInButton;
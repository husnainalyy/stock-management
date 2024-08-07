"use client";
import { signIn } from 'next-auth/react';

export default function SignIn() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
            <p className="text-lg mb-8">
                Please sign in to continue and access all the features of our application. We offer a secure and seamless sign-in process using your Google account.
            </p>
            <div className="bg-white p-6 rounded shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
                <p className="mb-4">
                    By signing in, you agree to our terms and conditions and privacy policy.
                </p>
                <button onClick={() => signIn('google')} className="bg-blue-500 text-white p-2 rounded">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import Navbar component
const Navbar = dynamic(() => import('@/components/Header'), { ssr: false });

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="flex flex-col overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>
            {children}
        </div>
    );
}
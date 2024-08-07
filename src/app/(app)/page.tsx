"use client";
import HeroSection from '@/components/Hero';
import Feature2 from '@/components/Feature2';
import Content2 from '@/components/Content2';
import Feature from '@/components/Feature';
import Footer from '@/components/Footer';
import SignInButton from '@/components/signInButton';

export default function Home() {
    
    return (
        <div className="container mx-auto p-6 text-center">
            <HeroSection />
            <Feature2 />
            <Content2/>
            <Feature />
            <SignInButton />
            <Footer/>
        </div>
    );
}

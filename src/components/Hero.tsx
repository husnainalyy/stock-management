
import Image from 'next/image';
import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <Image
                        className="object-cover object-center rounded"
                        src="https://images.unsplash.com/photo-1627719172038-611c725920bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // You can replace this with a relevant image
                        width={500}
                        height={500}
                        alt="stock management"
                    />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Streamline Your Inventory Management
                        <br className="hidden lg:inline-block" />
                        with Our Advanced System
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Manage your stock effortlessly with our intuitive system designed to help you keep track of products, categories, and quantities. From real-time updates to detailed reporting, our solution ensures you stay ahead in inventory management.
                    </p>
                    
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

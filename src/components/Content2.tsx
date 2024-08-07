
import React from 'react';

const Content2: React.FC = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container flex flex-wrap px-5 py-10 mx-auto items-center">
                <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Stock Manager Platform</h1>
                    <p className="leading-relaxed text-base">
                        Efficiently manage your inventory with our Stock Manager Platform. Track stock levels, update product information, and streamline your inventory management process with ease. Our platform provides real-time updates, insightful analytics, and seamless integration to help you stay on top of your stock.
                    </p>
                </div>
                <div className="flex flex-col md:w-1/2 md:pl-12">
                    <h2 className="title-font font-semibold text-gray-800 tracking-wider text-sm mb-3">FEATURES</h2>
                    <nav className="flex flex-wrap list-none -mb-1">
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#stock-tracking" className="text-gray-600 hover:text-gray-800">Real-Time Tracking</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#product-management" className="text-gray-600 hover:text-gray-800">Product Management</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#analytics" className="text-gray-600 hover:text-gray-800">Detailed Analytics</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#integrations" className="text-gray-600 hover:text-gray-800">Seamless Integrations</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#support" className="text-gray-600 hover:text-gray-800">24/7 Customer Support</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#security" className="text-gray-600 hover:text-gray-800">Enhanced Security</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#scalability" className="text-gray-600 hover:text-gray-800">Scalable Solutions</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#user-friendly" className="text-gray-600 hover:text-gray-800">User-Friendly Interface</a>
                        </li>
                        <li className="lg:w-1/3 mb-1 w-1/2">
                            <a href="#user-friendly" className="text-gray-600 hover:text-gray-800">Multi user app</a>
                        </li>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default Content2;

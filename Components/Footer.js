import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-4">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-arround ">
                    <div className="w-full md:w-1/5 mb-4 md:mb-0">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-gray-700">Contact Us</h3>
                            <p className="text-gray-700 font-semibold py-1">Phone:</p>
                            <p className="text-gray-700 font-semibold py-1">Email:</p>
                            <p className="text-gray-700 font-semibold py-1">Address</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 mb-4 md:mb-0">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-gray-700">Quick Links</h3>
                            <ul className="list-none p-0 m-0 font-semibold flex flex-col items-center ">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Home</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Services</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">FAQs</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 mb-4 md:mb-0">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-gray-700">Social Media</h3>
                            <ul className="list-none p-0 m-0 font-semibold flex flex-col items-center">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Facebook</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Twitter</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Instagram</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-gray-700">For patients</h3>
                            <ul className="list-none p-0 m-0 font-semibold flex flex-col items-center">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Search for doctors</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Read health articles</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Consult a doctor</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Order medicines</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-gray-700">For doctors</h3>
                            <ul className="list-none p-0 m-0 font-semibold flex flex-col items-center">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Consult</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500"> Health Feed</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500"> Profile</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-blue-200 mt-6 ">
                    <p className="text-center text-gray-700">© 2023 Telemed Platform. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

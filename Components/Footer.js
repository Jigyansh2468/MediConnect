import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-4 w-full">
            <div className="w-full px-4 max-w-[1440px] mx-auto">
                <div className="flex flex-wrap justify-center"> {/* Center the content on smaller screens */}
                    <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Contact Us</h3>
                            <p className="text-gray-700 font-semibold py-1">Email : mediconnect@gmail.com</p>
                            <p className="text-gray-700 font-semibold py-1">Instagram : mediconnect</p>
                            <p className="text-gray-700 font-semibold py-1">Twitter : mediconnect</p>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Quick Links</h3>
                            <ul className="list-none font-semibold flex flex-col items-center">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Home</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Services</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">FAQs</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Blog</Link></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Social Media</h3>
                            <ul className="list-none font-semibold flex flex-col items-center">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Facebook</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Twitter</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Instagram</Link></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full md:w-1/2 lg:w-1/5">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-blue-400">For patients</h3>
                            <ul className="list-none font-semibold flex flex-col items-center">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Search for doctors</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Read health articles</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Consult a doctor</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Order medicines</Link></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full md:w-1/2 lg:w-1/5">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2 text-blue-400">For doctors</h3>
                            <ul className="list-none font-semibold flex flex-col items-center">
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Consult</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Health Feed</Link></li>
                                <li><Link href="#" className="text-gray-700 hover:text-blue-500">Profile</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="border-t border-blue-200 mt-6">
                    <p className="text-center text-gray-700">© 2024 MediConnect. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
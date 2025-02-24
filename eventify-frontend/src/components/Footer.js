import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-16 relative overflow-hidden">
            {/* Left Graffiti Decoration */}
            <div className="absolute left-0 top-0 h-full w-32 opacity-10">
                <svg className="h-full" viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 50C40 80 10 120 30 150C50 180 20 220 40 250" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
                    <path d="M0 100C30 130 0 170 20 200C40 230 10 270 30 300" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
                    <circle cx="25" cy="150" r="5" fill="currentColor" className="text-cyan-400"/>
                    <circle cx="15" cy="250" r="5" fill="currentColor" className="text-purple-400"/>
                    <path d="M10 80L30 100M20 90L40 70" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
                    <path d="M5 180L25 200M15 190L35 170" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
                </svg>
            </div>

            {/* Right Graffiti Decoration */}
            <div className="absolute right-0 top-0 h-full w-32 opacity-10">
                <svg className="h-full" viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M80 50C60 80 90 120 70 150C50 180 80 220 60 250" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
                    <path d="M100 100C70 130 100 170 80 200C60 230 90 270 70 300" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
                    <circle cx="75" cy="150" r="5" fill="currentColor" className="text-cyan-400"/>
                    <circle cx="85" cy="250" r="5" fill="currentColor" className="text-purple-400"/>
                    <path d="M90 80L70 100M80 90L60 70" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
                    <path d="M95 180L75 200M85 190L65 170" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
                </svg>
            </div>

            {/* Bottom Edge Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Eventify</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your premier platform for discovering and managing events across Kenya. 
                            Making event planning and attendance seamless.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about-us" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
                            <li><Link to="/events" className="hover:text-cyan-400 transition-colors">Events</Link></li>
                            <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
                            
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <span className="text-sm">eventify@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <span className="text-sm">+254-712-345-678</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <div className="text-sm">
                                    <p>P.O.BOX 100-00100</p>
                                    <p>NAIROBI, KENYA</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://twitter.com/EVENIFY" className="hover:text-cyan-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="https://instagram.com/EVENIFY" className="hover:text-cyan-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a href="https://youtube.com/EVENIFY-EVENTS" className="hover:text-cyan-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/company/EVENIFY-EVENTS" className="hover:text-cyan-400 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Barcode Logo Section */}
                        <div className="bg-gray-800 p-4 rounded-lg mt-4">
                            <div className="text-4xl font-barcode text-cyan-300 tracking-widest">
                                EVENTIFY
                            </div>
                            <div className="flex justify-center mt-1">
                                <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright with decoration */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-4">
                        <div className="w-8 h-8 rounded-full border-2 border-cyan-400/30 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400">© 2025 WWW.EVENTIFY.COM | All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 
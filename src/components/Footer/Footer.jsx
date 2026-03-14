import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faPinterestP
} from '@fortawesome/free-brands-svg-icons';
import { faArrowUp, faChevronRight, faShield } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/freshcart-logo.svg';

const FooterLink = ({ to, children }) => (
    <NavLink
        to={to}
        className="group flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200 mb-2.5 last:mb-0"
    >
        <FontAwesomeIcon
            icon={faChevronRight}
            className="text-[10px] mr-2 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
        />
        <span className="tracking-wide font-medium">{children}</span>
    </NavLink>
);

const SocialIcon = ({ icon, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 transform hover:-translate-y-1"
    >
        <FontAwesomeIcon icon={icon} className="text-sm" />
    </a>
);

export default function Footer() {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-white border-t border-gray-200 pt-8 pb-2">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1 max-w-xs">
                        <NavLink to="/" className="inline-block mb-6 transform hover:scale-105 transition-transform">
                            <img src={logo} alt="FreshCart" className="h-9" />
                        </NavLink>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            FreshCart is a versatile e-commerce platform offering a wide range
                            of products, from clothing to electronics. It provides a user-friendly
                            experience for seamless shopping across diverse categories.
                        </p>
                        <div className="flex items-center space-x-3">
                            <SocialIcon icon={faFacebookF} href="#" />
                            <SocialIcon icon={faTwitter} href="#" />
                            <SocialIcon icon={faInstagram} href="#" />
                            <SocialIcon icon={faPinterestP} href="#" />
                        </div>
                    </div>

                    {/* Column 2: Categories */}
                    <div>
                        <h4 className="font-semibold text-gray-800 text-base mb-6">Categories</h4>
                        <div className="flex flex-col">
                            <FooterLink to="/categories/mens-fashion">Men's Fashion</FooterLink>
                            <FooterLink to="/categories/womens-fashion">Women's Fashion</FooterLink>
                            <FooterLink to="/categories/baby-toys">Baby & Toys</FooterLink>
                            <FooterLink to="/categories/beauty-health">Beauty & Health</FooterLink>
                            <FooterLink to="/categories/electronics">Electronics</FooterLink>
                        </div>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gray-800 text-base mb-6">Quick Links</h4>
                        <div className="flex flex-col">
                            <FooterLink to="/about">About Us</FooterLink>
                            <FooterLink to="/contact">Contact Us</FooterLink>
                            <FooterLink to="/privacy">Privacy Policy</FooterLink>
                            <FooterLink to="/terms">Terms of Service</FooterLink>
                            <FooterLink to="/shipping">Shipping Policy</FooterLink>
                        </div>
                    </div>

                    {/* Column 4: Customer Service */}
                    <div>
                        <h4 className="font-semibold text-gray-800 text-base mb-6">Customer Service</h4>
                        <div className="flex flex-col">
                            <FooterLink to="/account">My Account</FooterLink>
                            <FooterLink to="/orders">My Orders</FooterLink>
                            <FooterLink to="/wishList">Wishlist</FooterLink>
                            <FooterLink to="/returns">Returns & Refunds</FooterLink>
                            <FooterLink to="/help">Help Center</FooterLink>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2024 <span className="text-primary-600">FreshCart</span>. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <FontAwesomeIcon icon={faShield} className="text-primary-600 text-base" />
                        <span className="text-sm font-semibold uppercase tracking-tighter">Secure Payment Gateway</span>
                    </div>
                </div>
            </div>

            {/* Scroll-to-Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 w-11 h-11 rounded-full bg-primary-600 text-white shadow-xl flex items-center justify-center transition-all duration-300 z-50 hover:bg-primary-700 hover:-translate-y-1 active:scale-95 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
            >
                <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
            </button>
        </footer>
    );
}
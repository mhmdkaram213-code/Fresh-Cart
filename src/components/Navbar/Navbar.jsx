import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faEnvelope,
    faChevronDown,
    faGlobe,
    faSearch,
    faCartShopping,
    faUserPlus,
    faRightToBracket,
    faArrowRightFromBracket,
    faBars,
    faXmark,
    faBuilding,
    faHouse,
    faLayerGroup,
    faList,
    faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regHeart, faUser as regUser } from '@fortawesome/free-regular-svg-icons';
import logo from '../../assets/images/freshcart-logo.svg';
import { categories } from '../../data/categories';



const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 shadow-sm"
            >
                <FontAwesomeIcon icon={faBars} />
                <span className="whitespace-nowrap">All Categories</span>
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden animate-fadeIn">
                    {categories.map((cat) => (
                        <NavLink
                            key={cat.path}
                            to={cat.path}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 border-b border-gray-50 last:border-0"
                        >
                            <FontAwesomeIcon icon={cat.icon} className="w-5 text-center text-gray-400 group-hover:text-primary-600" />
                            <span className="font-medium">{cat.name}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

const TopBar = () => (
    <div className="bg-gray-100 py-2 border-b border-gray-200 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs text-gray-500 font-medium">
            <div className="flex justify-center items-center space-x-6">
                <div className="flex justify-center items-center hover:text-primary-600 cursor-default transition-colors">
                    <FontAwesomeIcon icon={faPhone} className="mr-1 text-primary-600" />
                    <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex justify-center items-center hover:text-primary-600 cursor-default transition-colors">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-1 text-primary-600" />
                    <span>support@freshcart.com</span>
                </div>
            </div>
            <div className="flex items-center space-x-5">
                <NavLink to="/track-order" className="hover:text-primary-600 transition-colors">Track Order</NavLink>
                <NavLink to="/about" className="hover:text-primary-600 transition-colors">About</NavLink>
                <NavLink to="/contact" className="hover:text-primary-600 transition-colors">Contact</NavLink>
                <div className="flex items-center cursor-pointer hover:text-primary-600 group">
                    <span>EGP</span>
                    <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-[10px] group-hover:rotate-180 transition-transform" />
                </div>
                <div className="flex items-center cursor-pointer hover:text-primary-600 group">
                    <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                    <span>عربية</span>
                    <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-[10px] group-hover:rotate-180 transition-transform" />
                </div>
            </div>
        </div>
    </div>
);

const MainNav = ({ setIsMenuOpen, token, setShowLogoutModal }) => {
    const { cartCount } = useCart();
    return (
    <div className="py-4 bg-white shadow-sm sticky top-0 lg:static z-40">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
            <NavLink to="/" className="shrink-0 transform hover:scale-105 transition-transform duration-200">
                <img src={logo} alt="FreshCart" className="h-8 md:h-10" />
            </NavLink>

            <div className="flex-1 max-w-2xl relative hidden md:block group">
                <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    className="w-full pl-5 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-600 focus:bg-white focus:ring-4 focus:ring-primary-100/50 transition-all duration-300 text-sm"
                />
                <button className="absolute right-0 top-0 h-full px-5 text-gray-400 hover:text-primary-600 group-focus-within:text-primary-600 transition-colors">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {/* RIGHT SIDE ICONS */}
            <div className="flex items-center gap-4">
                {/* DESKTOP ONLY — hide on mobile */}
                <div className="hidden md:flex items-center gap-4">
                    {token ? (
                        <>
                            {/* Wishlist */}
                            <NavLink to="/wishlist" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                                <FontAwesomeIcon icon={regHeart} className="text-xl" />
                                <span className="text-xs">Wishlist</span>
                            </NavLink>

                            {/* Account */}
                            <NavLink to="/account" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                                <FontAwesomeIcon icon={regUser} className="text-xl" />
                                <span className="text-xs">Account</span>
                            </NavLink>

                            {/* Orders */}
                            <NavLink to="/allorders" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                                <FontAwesomeIcon icon={faListCheck} className="text-xl" />
                                <span className="text-xs">Orders</span>
                            </NavLink>

                            {/* Logout */}
                            <button onClick={() => setShowLogoutModal(true)} className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-primary-600 transition-colors duration-200 bg-transparent border-none">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-xl" />
                                <span className="text-xs">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Signup */}
                            <NavLink to="/signup" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                                <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                                <span className="text-xs text-primary-600 font-semibold">Signup</span>
                            </NavLink>

                            {/* Login */}
                            <NavLink to="/login" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                                <FontAwesomeIcon icon={faRightToBracket} className="text-xl" />
                                <span className="text-xs">Login</span>
                            </NavLink>
                        </>
                    )}
                </div>

                {/* ALWAYS VISIBLE — Cart (mobile + desktop) */}
                <NavLink to="/cart" className="flex flex-col items-center gap-0.5 relative text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <div className="relative">
                        <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-xs hidden md:block">Cart</span>
                </NavLink>

                {/* MOBILE ONLY — Hamburger menu */}
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                    <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>
            </div>
        </div>
    </div>
    );
};

const CategoryNav = () => {
    const navLinkClass = ({ isActive }) => `
        relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200
        ${isActive ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600 after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300
        ${isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
    `;

    return (
        <div className="py-2 border-y border-gray-100 bg-white hidden lg:block sticky top-0 z-30 shadow-sm">
            <div className="container mx-auto px-4 flex items-center gap-0">
                <CategoryDropdown />

                <nav className="flex items-center ml-8 space-x-10">
                    <NavLink to="/" end className={navLinkClass}>Home</NavLink>
                    <NavLink to="/brands" className={navLinkClass}>Brands</NavLink>
                    <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>
                    <NavLink to="/subcategories" className={navLinkClass}>SubCategories</NavLink>
                </nav>
            </div>
        </div>
    );
};

const MobileSidebar = ({ isOpen, setIsOpen, token, setShowLogoutModal }) => (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        <div className={`absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-2xl p-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-8 pb-4 border-b">
                <img src={logo} alt="FreshCart" className="h-8" />
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-primary-600">
                    <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                </button>
            </div>

            <div className="flex flex-col space-y-6 overflow-y-auto max-h-[calc(100vh-150px)] pb-10">
                <div className="relative">
                    <input type="text" placeholder="Search products..." className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-600/20" />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <nav className="flex flex-col space-y-4">
                    <NavLink to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-800 font-bold hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50">
                        <FontAwesomeIcon icon={faHouse} className="w-5 text-primary-600" />
                        Home
                    </NavLink>
                    <NavLink to="/brands" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-800 font-bold hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50">
                        <FontAwesomeIcon icon={faBuilding} className="w-5 text-primary-600" />
                        Brands
                    </NavLink>
                    <NavLink to="/categories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-800 font-bold hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50">
                        <FontAwesomeIcon icon={faLayerGroup} className="w-5 text-primary-600" />
                        Categories
                    </NavLink>
                    <NavLink to="/subcategories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-800 font-bold hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50">
                        <FontAwesomeIcon icon={faList} className="w-5 text-primary-600" />
                        SubCategories
                    </NavLink>
                </nav>

                {token && (
                    <div className="pt-6 border-t flex flex-col space-y-3">
                        <NavLink to="/account" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">
                            <FontAwesomeIcon icon={regUser} className="w-5" /> Account
                        </NavLink>
                        <NavLink to="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">
                            <FontAwesomeIcon icon={regHeart} className="w-5" /> Wishlist
                        </NavLink>
                        <NavLink to="/allorders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-gray-600 font-medium p-2 hover:bg-gray-50 rounded-lg">
                            <FontAwesomeIcon icon={faListCheck} className="w-5" /> All Orders
                        </NavLink>
                    </div>
                )}

                <div className="pt-6 border-t grid grid-cols-2 gap-3">
                    {token ? (
                        <button onClick={() => { setIsOpen(false); setShowLogoutModal(true); }} className="col-span-2 text-center py-2.5 bg-gray-100 font-bold rounded-xl text-gray-600 hover:bg-gray-200">Logout</button>
                    ) : (
                        <>
                            <NavLink to="/login" onClick={() => setIsOpen(false)} className="text-center py-2.5 bg-gray-100 font-bold rounded-xl text-gray-600">Login</NavLink>
                            <NavLink to="/signup" onClick={() => setIsOpen(false)} className="text-center py-2.5 bg-primary-600 font-bold rounded-xl text-white shadow-lg">Signup</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Disable scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <header className="w-full relative">
            <TopBar />
            <MainNav setIsMenuOpen={setIsMenuOpen} token={token} setShowLogoutModal={setShowLogoutModal} />
            <CategoryNav />
            <MobileSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} token={token} setShowLogoutModal={setShowLogoutModal} />

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center animate-fadeIn">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-3xl text-primary-600 mb-3" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Logout?
                        </h3>
                        <p className="text-sm text-gray-500 mb-5">
                            Are you sure you want to logout?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    logout()
                                    setShowLogoutModal(false)
                                    navigate('/login')
                                }}
                                className="flex-1 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

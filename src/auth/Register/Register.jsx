import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faSpinner, faLeaf, faTruckFast, faShieldHalved, faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { registerSchema } from '../../schema/AuthSchema/RegisterSchema';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const { login } = useAuth();
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onChange', // To dynamically check validity for button state
    });

    const onSubmit = async (data) => {
        setApiError(null);
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', {
                name: data.name,
                email: data.email,
                password: data.password,
                rePassword: data.rePassword,
                phone: data.phone
            });

            if (response.data.message === 'success') {
                console.log(response.data) // debug: see full response
                login(response.data.token, response.data.user);
                navigate('/');
            }
        } catch (error) {
            setApiError(error.response?.data?.message || 'An error occurred during registration');
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Section - Marketing (Hidden on Mobile) */}
            <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-white to-green-50 overflow-hidden items-center justify-center p-12">
                {/* Abstract Background Pattern Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-yellow-100/40 rounded-full blur-3xl"></div>

                <div className="relative z-10 w-full max-w-2xl h-full flex flex-col pt-8">
                    {/* Logo */}
                    <div className="mb-12 flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <FontAwesomeIcon icon={faLeaf} className="text-white text-2xl" />
                        </div>
                        <span className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Fresh<span className="text-primary-600">Cart</span>
                        </span>
                    </div>

                    <div className="mb-16 ">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">Everything You Need, <br /><span className="text-primary-600 font-semibold relative inline-block mt-1">One Click Away.<svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" /></svg></span></h1>
                        <p className="text-sm text-gray-400">Join thousands of happy shoppers today.</p>
                    </div>

                    {/* Floating Cards Container */}
                    <div className="relative flex-1 min-h-[400px]">
                        {/* Card 1: Farm Fresh */}
                        <div className="absolute top-0 right-12 w-64 bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-xl shadow-gray-200/40 border border-white/50 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300 z-20">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                                <FontAwesomeIcon icon={faAppleWhole} className="text-orange-500 text-lg" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Farm Fresh</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Sourced directly from local farmers to your table.</p>
                        </div>

                        {/* Card 2: Same Day Delivery */}
                        <div className="absolute top-28 left-4 w-64 bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-xl shadow-gray-200/40 border border-white/50 transform rotate-[3deg] hover:rotate-0 transition-transform duration-300 z-30">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                <FontAwesomeIcon icon={faTruckFast} className="text-blue-500 text-lg" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Same Day Delivery</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Fast, reliable delivery straight to your door.</p>
                        </div>

                        {/* Card 3: Secure Checkout */}
                        <div className="absolute top-52 right-4 w-64 bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-xl shadow-gray-200/40 border border-white/50 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-300 z-20">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                                <FontAwesomeIcon icon={faShieldHalved} className="text-purple-500 text-lg" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Secure Checkout</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">100% encrypted and safe payment processing.</p>
                        </div>

                        {/* Card 4: Guaranteed Quality */}
                        <div className="absolute bottom-4 left-16 w-64 bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-xl shadow-gray-200/40 border border-white/50 transform rotate-[2deg] hover:rotate-0 transition-transform duration-300 z-30">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                <FontAwesomeIcon icon={faLeaf} className="text-green-600 text-lg" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">Guaranteed Quality</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Hand-picked items ensuring only the best quality.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
                        <p className="text-gray-500">Sign up to start shopping</p>
                    </div>

                    {apiError && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300'} rounded-xl text-sm transition-colors bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                                    {...register('name')}
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300'} rounded-xl text-sm transition-colors bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="01012345678"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.phone ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300'} rounded-xl text-sm transition-colors bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                                    {...register('phone')}
                                />
                            </div>
                            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FontAwesomeIcon icon={faLock} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300'} rounded-xl text-sm transition-colors bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                                    {...register('password')}
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="rePassword">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FontAwesomeIcon icon={faLock} />
                                </div>
                                <input
                                    id="rePassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.rePassword ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300'} rounded-xl text-sm transition-colors bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                                    {...register('rePassword')}
                                />
                            </div>
                            {errors.rePassword && <p className="mt-1 text-sm text-red-500">{errors.rePassword.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className={`w-full py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] text-sm font-medium text-white transition-all duration-200 flex justify-center items-center ${!isValid || isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-primary-600 hover:bg-primary-700 hover:shadow-[0_6px_20px_rgba(22,163,74,0.23)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:-translate-y-0.5'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5 text-white" />
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
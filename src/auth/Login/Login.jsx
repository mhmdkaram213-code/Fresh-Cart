import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faAppleWhole, faEnvelope, faEye, faEyeSlash, faLeaf, faLock, faShieldHalved, faSpinner, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../../schema/AuthSchema/LoginSchema';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
        email: data.email,
        password: data.password
      });

      if (response.data.message === 'success') {
        console.log(response.data) // debug: see full response
        login(response.data.token, response.data.user);
        navigate('/'); // Navigating to home
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Invalid email or password');
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

          <div className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">Welcome <br /><span className="text-primary-600 relative inline-block">Back!<svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" /></svg></span></h1>
            <p className="text-xl text-gray-600 font-medium">Log in to continue shopping your daily fresh groceries.</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <p className="text-gray-500">Access your Fresh Cart account</p>
          </div>

          {apiError && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FontAwesomeIcon icon={faLock} className="pointer-events-none" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-10 py-2.5 border ${errors.password ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500 hover:border-gray-300'} rounded-xl text-sm transition-colors bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-opacity-20`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgetPassword" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
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
                  'Login'
                )}
              </button>
            </div>
          </form>

          {/* Social Logins */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FontAwesomeIcon icon={faGoogle} className="text-red-500 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-blue-600 mr-2" />
                Facebook
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
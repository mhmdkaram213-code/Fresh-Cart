import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHeart, faSpinner, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

const schema = z.object({
  resetCode: z.string().length(6, 'Reset code must be 6 digits')
})

export default function VerifyResetCode() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const email = localStorage.getItem('resetEmail')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  async function onSubmit(data) {
    setLoading(true)
    setError('')
    try {
      await axios.post(`${BASE}/auth/verifyResetCode`, data)
      navigate('/reset-password')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faShieldHeart} className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Verify Code</h1>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            We've sent a 6-digit verification code to <br/>
            <span className="font-semibold text-gray-900">{email || 'your email'}</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              {...register('resetCode')}
              type="text"
              placeholder="000000"
              maxLength={6}
              className={`w-full px-4 py-3 bg-gray-50 border text-center text-2xl tracking-[0.5em] font-bold rounded-xl focus:outline-none focus:ring-4 transition-all duration-300
                ${errors.resetCode 
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-400' 
                  : 'border-gray-200 focus:ring-primary-100 focus:border-primary-600'
                }`}
            />
            {errors.resetCode && (
              <p className="mt-1.5 text-xs text-red-500 font-medium text-center">
                {errors.resetCode.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <button 
            onClick={() => navigate('/forgot-password')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors bg-transparent border-none"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            Resend Email
          </button>
        </div>

      </div>
    </div>
  )
}

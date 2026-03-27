import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

const schema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters')
})

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const email = localStorage.getItem('resetEmail')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email || ''
    }
  })

  async function onSubmit(data) {
    setLoading(true)
    setError('')
    try {
      await axios.put(`${BASE}/auth/resetPassword`, data)
      setSuccess(true)
      localStorage.removeItem('resetEmail')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Success!</h1>
          <p className="text-gray-500 mb-8">
            Your password has been reset successfully. <br/>
            Redirecting you to login...
          </p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full animate-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faLock} className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">New Password</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Set a new, secure password for your account.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register('email')} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                {...register('newPassword')}
                type="password"
                placeholder="••••••••"
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-4 transition-all duration-300
                  ${errors.newPassword 
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-400' 
                    : 'border-gray-200 focus:ring-primary-100 focus:border-primary-600'
                  }`}
              />
              <FontAwesomeIcon 
                icon={faLock} 
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors
                  ${errors.newPassword ? 'text-red-400' : 'text-gray-400'}`}
              />
            </div>
            {errors.newPassword && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {errors.newPassword.message}
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
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

      </div>
    </div>
  )
}

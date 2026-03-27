import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function OrderSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { paymentType, form } = location.state || {}

  useEffect(() => {
    if (!location.state) navigate('/')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center 
      justify-center px-4">
      <div className="max-w-md w-full text-center">

        <div className="w-24 h-24 bg-green-100 rounded-full 
          flex items-center justify-center mx-auto mb-6
          animate-bounce">
          <i className="fa-solid fa-circle-check 
            text-5xl text-green-500"></i>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your order. We'll process it right away.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 
          shadow-sm p-5 text-left mb-6">

          <h2 className="text-sm font-bold text-gray-700 mb-3">
            Order Details
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className={`font-semibold capitalize
                ${paymentType === 'cash' 
                  ? 'text-green-600' : 'text-blue-600'}`}>
                {paymentType === 'cash' 
                  ? '💵 Cash on Delivery' 
                  : '💳 Online Payment'}
              </span>
            </div>
            {form && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Address</span>
                  <span className="font-medium text-gray-700 
                    text-right max-w-48 truncate">
                    {form.details}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">City</span>
                  <span className="font-medium text-gray-700">
                    {form.city}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-700">
                    {form.phone}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/allorders')}
            className="w-full py-3 bg-primary-600 text-white 
              rounded-xl font-semibold hover:bg-primary-700 
              transition-colors flex items-center 
              justify-center gap-2"
          >
            <i className="fa-solid fa-list-check"></i>
            View My Orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 border border-gray-200 
              text-gray-600 rounded-xl font-medium 
              hover:bg-gray-50 transition-colors flex items-center 
              justify-center gap-2"
          >
            <i className="fa-solid fa-bag-shopping"></i>
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function AllOrders() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  const getUserOrders = useCallback(async (userId) => {
    try {
      const { data } = await axios.get(`${BASE}/orders/user/${userId}`)
      // The API returns the array directly in 'data' or 'data.data' 
      // depending on the version/endpoint
      setOrders(Array.isArray(data) ? data : (data.data || []))
    } catch (err) {
      console.error("Fetch orders error:", err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!token) return

    try {
      const decoded = jwtDecode(token)
      const userId = decoded.id

      // 1. Initial Fetch
      getUserOrders(userId)

      // 2. Retry after 3 seconds (to handle backend delay after Stripe)
      const timer = setTimeout(() => {
        getUserOrders(userId)
      }, 3000)

      return () => clearTimeout(timer)
    } catch (err) {
      console.error("JWT Decode error:", err)
      setLoading(false)
    }
  }, [token, getUserOrders])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <i className="fa-solid fa-spinner fa-spin 
        text-4xl text-primary-600"></i>
    </div>
  )

  if (orders.length === 0) return (
    <div className="min-h-screen flex flex-col items-center 
      justify-center gap-4">
      <i className="fa-solid fa-box-open text-6xl text-gray-200"></i>
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-400">
          No orders yet
        </p>
        <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
          If you just placed an order, it might take a few seconds to appear.
        </p>
      </div>
      <button onClick={() => navigate('/')}
        className="px-6 py-2.5 bg-primary-600 text-white 
          rounded-xl text-sm font-medium hover:bg-primary-700 
          transition-colors">
        Start Shopping
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Orders
          <span className="ml-2 text-sm font-normal text-gray-500 
            bg-gray-100 px-2 py-0.5 rounded-full">
            {orders.length} orders
          </span>
        </h1>

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id}
              className="bg-white rounded-2xl border border-gray-100 
                shadow-sm p-5">

              {/* Order Header */}
              <div className="flex items-center justify-between mb-4 
                flex-wrap gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">
                    Order ID
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    #{order.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">
                    Order Date
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {/* Payment Status */}
                  <span className={`px-3 py-1 rounded-full text-xs 
                    font-semibold
                    ${order.isPaid
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.isPaid ? '✓ Paid' : '⏳ Pending Payment'}
                  </span>
                  {/* Delivery Status */}
                  <span className={`px-3 py-1 rounded-full text-xs 
                    font-semibold
                    ${order.isDelivered
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'}`}>
                    {order.isDelivered 
                      ? '📦 Delivered' : '🚚 Processing'}
                  </span>
                  {/* Payment Type */}
                  <span className="px-3 py-1 rounded-full text-xs 
                    font-semibold bg-primary-50 text-primary-600 capitalize">
                    {order.paymentMethodType}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-2 mb-4">
                {order.cartItems?.map(item => (
                  <div key={item._id}
                    className="flex items-center gap-3 p-3 
                      bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg 
                      flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-box 
                        text-primary-600 text-xs"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700">
                         {item.product?.title || `Product ID: ${item.product}`}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.count}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-primary-600 
                      flex-shrink-0">
                      {item.price * item.count} EGP
                    </p>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div className="flex items-start gap-2 p-3 
                  bg-gray-50 rounded-xl mb-4 text-xs text-gray-600">
                  <i className="fa-solid fa-location-dot 
                    text-primary-600 mt-0.5"></i>
                  <span>
                    {order.shippingAddress.details}, 
                    {order.shippingAddress.city} · 
                    {order.shippingAddress.phone}
                  </span>
                </div>
              )}

              {/* Order Total */}
              <div className="flex justify-between items-center 
                pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-primary-600">
                  {order.totalOrderPrice} EGP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

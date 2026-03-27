import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { z } from 'zod'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

const schema = z.object({
  details: z.string()
    .min(10, 'Address must be at least 10 characters'),
  phone: z.string()
    .regex(/^01[0125][0-9]{8}$/, 'Enter valid Egyptian phone number'),
  city: z.string()
    .min(2, 'City must be at least 2 characters'),
})

export default function CheckoutCash() {
  const navigate  = useNavigate()
  const { token } = useAuth()
  const { cartId, cartItems, totalPrice, fetchCart } = useCart()

  const [form,       setForm]       = useState({ details: '', phone: '', city: '' })
  const [errors,     setErrors]     = useState({})
  const [loading,    setLoading]    = useState(false)
  const [apiError,   setApiError]   = useState('')
  const [addresses,  setAddresses]  = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartId && cartItems.length === 0) navigate('/cart')
  }, [cartId])

  // Fetch saved addresses
  useEffect(() => {
    axios.get(`${BASE}/addresses`, { headers: { token } })
      .then(res => setAddresses(res.data.data || []))
      .catch(() => {})
  }, [])

  function handleSelectAddress(address) {
    setSelectedAddress(address._id)
    setForm({
      details: address.details,
      phone:   address.phone,
      city:    address.city,
    })
    setErrors({})
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const result = schema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setApiError('')
    setLoading(true)

    try {
      await axios.post(
        `${BASE}/orders/${cartId}`,
        { shippingAddress: form },
        { headers: { token } }
      )
      await fetchCart() // refresh cart (will be empty now)
      navigate('/order-success', { 
        state: { paymentType: 'cash', form } 
      })
    } catch (err) {
      setApiError(err.response?.data?.message || 'Order failed, try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <button onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-500 
            hover:text-primary-600 transition-colors mb-6 text-sm">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Cart
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Cash on Delivery
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Form */}
          <div className="lg:col-span-2 space-y-5">

            {/* Saved Addresses */}
            {addresses.length > 0 && (
              <div className="bg-white rounded-2xl border 
                border-gray-100 shadow-sm p-5">
                <h2 className="text-sm font-semibold text-gray-700 
                  mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-location-dot 
                    text-primary-600"></i>
                  Saved Addresses
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map(addr => (
                    <button
                      key={addr._id}
                      type="button"
                      onClick={() => handleSelectAddress(addr)}
                      className={`text-left p-3 rounded-xl border-2 
                        transition-all duration-200
                        ${selectedAddress === addr._id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                        }`}
                    >
                      <p className="text-xs font-bold text-gray-700 
                        uppercase tracking-wide mb-1">
                        {addr.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {addr.details}
                      </p>
                      <p className="text-xs text-gray-500">
                        {addr.city} · {addr.phone}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <div className="bg-white rounded-2xl border 
              border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-700 
                mb-4 flex items-center gap-2">
                <i className="fa-solid fa-truck text-primary-600"></i>
                Shipping Address
              </h2>

              {apiError && (
                <div className="flex items-center gap-3 p-4 
                  bg-red-50 rounded-xl border border-red-200 mb-4">
                  <i className="fa-solid fa-circle-exclamation 
                    text-red-500"></i>
                  <p className="text-sm text-red-600">{apiError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Details */}
                <div>
                  <label className="block text-sm font-medium 
                    text-gray-700 mb-1.5">
                    Street Address
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-location-dot absolute 
                      left-3 top-1/2 -translate-y-1/2 
                      text-gray-400 text-sm"></i>
                    <input
                      type="text"
                      value={form.details}
                      onChange={e => {
                        setForm({ ...form, details: e.target.value })
                        setErrors({ ...errors, details: '' })
                      }}
                      placeholder="123 Main Street, Apt 4B"
                      className={`w-full pl-9 pr-4 py-3 border 
                        rounded-xl text-sm focus:outline-none 
                        focus:ring-2 focus:ring-primary-100 
                        transition-all
                        ${errors.details
                          ? 'border-red-400'
                          : 'border-gray-200 focus:border-primary-600'
                        }`}
                    />
                  </div>
                  {errors.details && (
                    <p className="text-red-500 text-xs mt-1.5 
                      flex items-center gap-1">
                      <i className="fa-solid fa-circle-exclamation 
                        text-xs"></i>
                      {errors.details}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium 
                    text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute 
                      left-3 top-1/2 -translate-y-1/2 
                      text-gray-400 text-sm"></i>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => {
                        setForm({ ...form, phone: e.target.value })
                        setErrors({ ...errors, phone: '' })
                      }}
                      placeholder="01XXXXXXXXX"
                      className={`w-full pl-9 pr-4 py-3 border 
                        rounded-xl text-sm focus:outline-none 
                        focus:ring-2 focus:ring-primary-100 
                        transition-all
                        ${errors.phone
                          ? 'border-red-400'
                          : 'border-gray-200 focus:border-primary-600'
                        }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 
                      flex items-center gap-1">
                      <i className="fa-solid fa-circle-exclamation 
                        text-xs"></i>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium 
                    text-gray-700 mb-1.5">
                    City
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-city absolute 
                      left-3 top-1/2 -translate-y-1/2 
                      text-gray-400 text-sm"></i>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => {
                        setForm({ ...form, city: e.target.value })
                        setErrors({ ...errors, city: '' })
                      }}
                      placeholder="Cairo"
                      className={`w-full pl-9 pr-4 py-3 border 
                        rounded-xl text-sm focus:outline-none 
                        focus:ring-2 focus:ring-primary-100 
                        transition-all
                        ${errors.city
                          ? 'border-red-400'
                          : 'border-gray-200 focus:border-primary-600'
                        }`}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1.5 
                      flex items-center gap-1">
                      <i className="fa-solid fa-circle-exclamation 
                        text-xs"></i>
                      {errors.city}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary-600 text-white 
                    rounded-xl font-semibold hover:bg-primary-700 
                    transition-all duration-300 active:scale-95
                    flex items-center justify-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-money-bill-wave"></i>
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border 
              border-gray-100 shadow-sm p-5 sticky top-4">

              <h2 className="text-base font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4 max-h-64 
                overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item._id}
                    className="flex items-center gap-3">
                    <img
                      src={item.product?.imageCover}
                      alt={item.product?.title}
                      className="w-12 h-12 object-contain rounded-lg 
                        border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 
                        line-clamp-1">
                        {item.product?.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-bold text-primary-600 
                      flex-shrink-0">
                      {(item.priceAfterDiscount || item.price) * item.quantity} EGP
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{totalPrice} EGP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-medium text-gray-700">
                    Cash on Delivery
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-3 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="text-xl font-bold text-primary-600">
                    {totalPrice} EGP
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

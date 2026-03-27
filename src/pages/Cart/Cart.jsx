import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { 
    cartItems, cartCount, totalPrice, cartId, cartLoading,
    updateQuantity, removeFromCart 
  } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) return (
    <div className="min-h-screen flex flex-col items-center 
      justify-center gap-4">
      <i className="fa-solid fa-cart-shopping text-6xl text-gray-200"></i>
      <p className="text-xl font-semibold text-gray-400">
        Your cart is empty
      </p>
      <button onClick={() => navigate('/')}
        className="px-6 py-2.5 bg-primary-600 text-white 
          rounded-xl text-sm font-medium hover:bg-primary-700 
          transition-colors">
        Continue Shopping
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Cart ({cartCount} items)
        </h1>

        <div className="space-y-3 mb-6">
          {cartItems.map(item => (
            <div key={item._id}
              className="bg-white rounded-2xl border border-gray-100 
                shadow-sm p-4 flex items-center gap-4">
              <img src={item.product?.imageCover} alt={item.product?.title}
                className="w-16 h-16 object-contain rounded-xl 
                  border border-gray-100" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 
                  line-clamp-1">{item.product?.title}</p>
                <p className="text-primary-600 font-bold text-sm mt-1">
                  {item.price * item.count} EGP
                </p>
                <p className="text-xs text-gray-400">
                  Qty: {item.count}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  
                  {/* Minus Button */}
                  <button
                    onClick={() => {
                      if (item.count === 1) {
                        removeFromCart(item._id)
                      } else {
                        updateQuantity(item._id, item.count - 1)
                      }
                    }}
                    className="w-7 h-7 rounded-full border border-gray-200 
                      flex items-center justify-center text-gray-600
                      hover:bg-red-50 hover:text-red-500 hover:border-red-200
                      transition-all duration-200 active:scale-90"
                  >
                    <i className="fa-solid fa-minus text-xs"></i>
                  </button>

                  {/* Count */}
                  <span className="w-6 text-center text-sm font-bold text-gray-800">
                    {item.count}
                  </span>

                  {/* Plus Button */}
                  <button
                    onClick={() => updateQuantity(item._id, item.count + 1)}
                    className="w-7 h-7 rounded-full border border-gray-200 
                      flex items-center justify-center text-gray-600
                      hover:bg-primary-50 hover:text-primary-600 
                      hover:border-primary-200
                      transition-all duration-200 active:scale-90"
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                  </button>

                </div>
              </div>
              <button onClick={() => removeFromCart(item._id)}
                className="w-8 h-8 rounded-full border border-gray-200 
                  flex items-center justify-center text-gray-400 
                  hover:bg-red-50 hover:text-red-500 hover:border-red-200
                  transition-colors">
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 
          shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">Total</span>
            <span className="text-2xl font-bold text-primary-600">
              {totalPrice} EGP
            </span>
          </div>
          <div className="space-y-3">
            {/* Cash on Delivery */}
            <button
              onClick={() => navigate('/checkout/cash')}
              className="w-full py-3 bg-primary-600 text-white 
                rounded-xl font-semibold hover:bg-primary-700 
                transition-all duration-300 active:scale-95
                flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-money-bill-wave"></i>
              Cash on Delivery
            </button>

            {/* Pay Online */}
            <button
              onClick={() => navigate('/checkout/online')}
              className="w-full py-3 bg-white border-2 border-primary-600 
                text-primary-600 rounded-xl font-semibold 
                hover:bg-primary-50 transition-all duration-300 
                active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-credit-card"></i>
              Pay Online
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
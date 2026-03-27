import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem'

export default function Cart() {
  const { 
    cartItems, cartCount, totalPrice, cartLoading,
    updateQuantity, removeFromCart, clearCart
  } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0 && !cartLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-gray-50/50">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
        <i className="fa-solid fa-cart-shopping text-5xl text-gray-300"></i>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 max-w-xs mx-auto">
          Look like you haven't added anything to your cart yet.
        </p>
      </div>
      <button onClick={() => navigate('/')}
        className="px-8 py-3 bg-primary-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 hover:-translate-y-0.5 transition-all active:scale-95">
        Start Shopping
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My Cart
            </h1>
            <p className="text-gray-500 mt-1 font-medium">
              You have {cartCount} items in your basket
            </p>
          </div>
          <button 
            onClick={clearCart}
            disabled={cartLoading || cartItems.length === 0}
            className="flex items-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-trash-can"></i>
            Clear Cart
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cartItems.map(item => (
            <CartItem 
              key={item._id} 
              item={item} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart}
              cartLoading={cartLoading}
            />
          ))}
        </div>

        {/* Footer / Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 bg-gray-900 text-white">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400 font-medium">Total Price</span>
              <span className="text-3xl font-black text-primary-400">
                {totalPrice} <span className="text-sm">EGP</span>
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/checkout/online')}
                disabled={cartLoading}
                className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-900/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <i className="fa-solid fa-credit-card"></i>
                Checkout Online
              </button>

              <button
                onClick={() => navigate('/checkout/cash')}
                disabled={cartLoading}
                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <i className="fa-solid fa-money-bill-wave"></i>
                Cash on Delivery
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'

export default function Wishlist() {
  const { wishlistItems } = useCart()
  const navigate = useNavigate()

  if (wishlistItems.length === 0) return (
    <div className="min-h-screen flex flex-col items-center 
      justify-center gap-4">
      <i className="fa-regular fa-heart text-6xl text-gray-200"></i>
      <p className="text-xl font-semibold text-gray-400">
        Your wishlist is empty
      </p>
      <button onClick={() => navigate('/')}
        className="px-6 py-2.5 bg-primary-600 text-white 
          rounded-xl text-sm font-medium hover:bg-primary-700 
          transition-colors">
        Explore Products
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          My Wishlist ({wishlistItems.length} items)
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {wishlistItems.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
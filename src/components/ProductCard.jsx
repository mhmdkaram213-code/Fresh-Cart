import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart()
  const navigate = useNavigate()
  const [addedAnim, setAddedAnim] = useState(false)

  async function handleAddToCart(e) {
    e.stopPropagation()
    const result = await addToCart(product._id)
    if (result?.success) {
      setAddedAnim(true)
      setTimeout(() => setAddedAnim(false), 600)
    }
  }

  function handleWishlist(e) {
    e.stopPropagation()
    toggleWishlist(product)
  }

  const inWishlist = isInWishlist(product._id)
  const inCart = isInCart(product._id)

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="group bg-white rounded-2xl border border-gray-100 
        shadow-sm hover:shadow-xl transition-all duration-300 
        cursor-pointer overflow-hidden hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-52">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-full object-contain p-4 
            group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full 
            flex items-center justify-center shadow-md
            transition-all duration-300 z-10
            ${inWishlist
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white text-gray-400 hover:text-red-500 hover:scale-110'
            }`}
        >
          <i className={`fa-${inWishlist ? 'solid' : 'regular'} fa-heart text-sm`}></i>
        </button>

        {/* Discount Badge */}
        {product.priceAfterDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white 
            text-xs font-bold px-2 py-0.5 rounded-full">
            SALE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Category */}
        {product.category?.name && (
          <p className="text-xs text-primary-600 font-medium mb-1 uppercase tracking-wide">
            {product.category.name.split(' ').slice(0, 2).join(' ')}
          </p>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 mb-1
          line-clamp-2 leading-snug">
          {product.title.split(' ').slice(0, 2).join(' ')}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Rating + Price Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Rating */}
          {product.ratingsAverage && (
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
              <span className="text-xs font-medium text-gray-600">
                {product.ratingsAverage}
              </span>
              {product.ratingsQuantity && (
                <span className="text-xs text-gray-400">
                  ({product.ratingsQuantity})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-1.5">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-sm font-bold text-primary-600">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-primary-600">
                {product.price} EGP
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold
            flex items-center justify-center gap-2
            transition-all duration-300 active:scale-95
            ${inCart
              ? 'bg-green-500 text-white'
              : 'bg-primary-600 text-white hover:bg-primary-700'
            }
            ${addedAnim ? 'scale-95' : 'scale-100'}`}
        >
          <i className={`fa-solid ${inCart
            ? 'fa-circle-check' : 'fa-cart-shopping'} text-xs`}></i>
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>

      </div>
    </div>
  )
}

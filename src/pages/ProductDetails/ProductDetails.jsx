import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../../context/CartContext'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart()

  const [product,      setProduct]      = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [activeImage,  setActiveImage]  = useState(0)
  const [addedAnim,    setAddedAnim]    = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${BASE}/products/${id}`)
      .then(res => setProduct(res.data.data))
      .finally(() => setLoading(false))
  }, [id])

  function handleAddToCart() {
    addToCart(product)
    setAddedAnim(true)
    setTimeout(() => setAddedAnim(false), 600)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-600"></i>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Product not found.</p>
    </div>
  )

  const images = product.images?.length > 0
    ? product.images
    : [product.imageCover]

  const inWishlist = isInWishlist(product._id)
  const inCart     = isInCart(product._id)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 
            hover:text-primary-600 transition-colors mb-6 text-sm">
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm 
          border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT — Images */}
            <div className="p-8 bg-gray-50 border-r border-gray-100">

              {/* Main Image */}
              <div className="relative h-80 mb-4 rounded-xl 
                overflow-hidden bg-white">
                <img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4
                    animate-fadeIn"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 justify-center flex-wrap">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden 
                        border-2 transition-all duration-200
                        ${activeImage === i
                          ? 'border-primary-600 scale-105'
                          : 'border-gray-200 hover:border-primary-300'
                        }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — Details */}
            <div className="p-8 flex flex-col justify-between">
              <div>

                {/* Category + Brand */}
                <div className="flex items-center gap-2 mb-3">
                  {product.category?.name && (
                    <span className="px-3 py-1 bg-primary-50 
                      text-primary-600 text-xs font-semibold rounded-full">
                      {product.category.name}
                    </span>
                  )}
                  {product.brand?.name && (
                    <span className="px-3 py-1 bg-gray-100 
                      text-gray-600 text-xs font-semibold rounded-full">
                      {product.brand.name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 
                  mb-3 leading-snug">
                  {product.title}
                </h1>

                {/* Rating */}
                {product.ratingsAverage && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(star => (
                        <i key={star}
                          className={`fa-star text-sm ${
                            star <= Math.round(product.ratingsAverage)
                              ? 'fa-solid text-yellow-400'
                              : 'fa-regular text-gray-300'
                          }`}></i>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {product.ratingsAverage}
                    </span>
                    {product.ratingsQuantity && (
                      <span className="text-sm text-gray-400">
                        ({product.ratingsQuantity} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                {product.description && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                {/* Extra Info */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {product.quantity !== undefined && (
                    <div className="flex items-center gap-2 
                      bg-gray-50 rounded-xl p-3">
                      <i className="fa-solid fa-box text-primary-600 text-sm"></i>
                      <div>
                        <p className="text-xs text-gray-400">In Stock</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {product.quantity} units
                        </p>
                      </div>
                    </div>
                  )}
                  {product.sold !== undefined && (
                    <div className="flex items-center gap-2 
                      bg-gray-50 rounded-xl p-3">
                      <i className="fa-solid fa-fire text-orange-500 text-sm"></i>
                      <div>
                        <p className="text-xs text-gray-400">Sold</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {product.sold} units
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Price + Actions */}
              <div>
                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  {product.priceAfterDiscount ? (
                    <>
                      <span className="text-3xl font-bold text-primary-600">
                        {product.priceAfterDiscount} EGP
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {product.price} EGP
                      </span>
                      <span className="px-2 py-0.5 bg-red-100 
                        text-red-600 text-xs font-bold rounded-full">
                        SALE
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary-600">
                      {product.price} EGP
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold
                      flex items-center justify-center gap-2
                      transition-all duration-300 active:scale-95
                      ${inCart
                        ? 'bg-green-500 text-white'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                      }
                      ${addedAnim ? 'scale-95' : ''}`}
                  >
                    <i className={`fa-solid ${inCart
                      ? 'fa-circle-check' : 'fa-cart-shopping'}`}></i>
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-12 h-12 rounded-xl border-2 flex items-center
                      justify-center transition-all duration-300 active:scale-95
                      ${inWishlist
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400'
                      }`}
                  >
                    <i className={`fa-${inWishlist ? 'solid' : 'regular'} fa-heart`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
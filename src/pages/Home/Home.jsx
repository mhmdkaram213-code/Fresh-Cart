import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../../components/ProductCard'
import Hero from '../../components/Hero'
import Features from '../../components/Features'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`${BASE}/products?limit=20`)
      .then(res => setProducts(res.data.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold tracking-tight">Loading Freshness...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-inner">
        <i className="fa-solid fa-circle-exclamation text-2xl"></i>
      </div>
      <p className="text-red-500 font-bold">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors"
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50/50 md:py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section with Luxurious Spacing */}
        <div className="mb-24">
          <Hero />
        </div>

        {/* Features Section with Clear Separation */}
        <div className="mb-24 px-12">
          <Features />
        </div>

        {/* Products Header */}
        <div className="flex items-end justify-between mb-12 ">
          <div>
            <span className="text-primary-600 font-black text-xs uppercase tracking-widest mb-2 block">
              Our Collection
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-400 font-bold text-sm tracking-tight bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              ✨ {products.length} Items Available
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </div>
  )
}
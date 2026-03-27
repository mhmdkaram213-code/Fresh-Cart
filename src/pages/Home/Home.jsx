import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../../components/ProductCard'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState('')

  useEffect(() => {
    axios.get(`${BASE}/products?limit=20`)
      .then(res => setProducts(res.data.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-600"></i>
        <p className="text-gray-500 text-sm">Loading products...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            All Products
          </h1>
          <p className="text-gray-500 mt-1">
            {products.length} products available
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </div>
  )
}
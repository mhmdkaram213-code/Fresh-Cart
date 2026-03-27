import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../../components/ProductCard'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function BrandDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [brand,    setBrand]    = useState(null)
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`${BASE}/brands/${id}`),
      axios.get(`${BASE}/products?brand=${id}&limit=20`)
    ]).then(([brandRes, productsRes]) => {
      setBrand(brandRes.data.data)
      setProducts(productsRes.data.data)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-600"></i>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 
            hover:text-primary-600 mb-6 text-sm transition-colors">
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>

        {brand && (
          <div className="bg-white rounded-2xl border border-gray-100 
            shadow-sm p-6 mb-8 flex items-center gap-5">
            <img src={brand.image} alt={brand.name}
              className="w-20 h-20 object-contain rounded-xl 
                border border-gray-100 p-2" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {brand.name}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {products.length} products available
              </p>
            </div>
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 
            md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <i className="fa-solid fa-box-open text-4xl text-gray-300 mb-3"></i>
            <p className="text-gray-500">No products found for this brand.</p>
          </div>
        )}
      </div>
    </div>
  )
}

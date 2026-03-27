import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function Brands() {
  const [brands,  setBrands]  = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${BASE}/brands?limit=40`)
      .then(res => setBrands(res.data.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-600"></i>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Brands</h1>
          <p className="text-gray-500 mt-1">{brands.length} brands</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 
          md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {brands.map(brand => (
            <div
              key={brand._id}
              onClick={() => navigate(`/brands/${brand._id}`)}
              className="bg-white rounded-2xl border border-gray-100 
                shadow-sm hover:shadow-lg transition-all duration-300 
                cursor-pointer hover:-translate-y-1 p-4 
                flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden 
                bg-gray-50 flex items-center justify-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain p-1 
                    group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-sm font-semibold text-gray-700 
                text-center group-hover:text-primary-600 
                transition-colors duration-200">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
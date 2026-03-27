import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${BASE}/categories?limit=30`)
      .then(res => setCategories(res.data.data))
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
          <h1 className="text-3xl font-bold text-gray-800">All Categories</h1>
          <p className="text-gray-500 mt-1">{categories.length} categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 
          md:grid-cols-4 lg:grid-cols-5 gap-5">
          {categories.map(cat => (
            <div
              key={cat._id}
              onClick={() => navigate(`/categories/${cat._id}`)}
              className="group bg-white rounded-2xl border border-gray-100 
                shadow-sm hover:shadow-xl transition-all duration-300 
                cursor-pointer hover:-translate-y-1 overflow-hidden"
            >
              <div className="h-36 overflow-hidden bg-gray-50">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover 
                    group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm font-semibold text-gray-800 
                  group-hover:text-primary-600 transition-colors duration-200">
                  {cat.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
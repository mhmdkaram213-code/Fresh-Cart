import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

export default function SubCategories() {
  const [subs,    setSubs]    = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${BASE}/subcategories?limit=50`)
      .then(res => setSubs(res.data.data))
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
          <h1 className="text-3xl font-bold text-gray-800">
            All SubCategories
          </h1>
          <p className="text-gray-500 mt-1">{subs.length} subcategories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subs.map(sub => (
            <div
              key={sub._id}
              onClick={() => navigate(`/subcategories/${sub._id}`)}
              className="group bg-white rounded-2xl border border-gray-100 
                shadow-sm hover:shadow-lg transition-all duration-300 
                cursor-pointer hover:-translate-y-1 p-5
                flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800 
                  group-hover:text-primary-600 transition-colors">
                  {sub.name}
                </p>
                {sub.category?.name && (
                  <p className="text-xs text-gray-400 mt-1">
                    {sub.category.name}
                  </p>
                )}
              </div>
              <i className="fa-solid fa-chevron-right text-gray-300 
                group-hover:text-primary-600 group-hover:translate-x-1
                transition-all duration-200 text-sm"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

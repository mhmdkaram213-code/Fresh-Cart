import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const BASE = 'https://ecommerce.routemisr.com/api/v1'

const CartContext = createContext()

export function CartProvider({ children }) {
  const { token } = useAuth()

  const [cartItems,    setCartItems]    = useState([])
  const [cartId,       setCartId]       = useState(null)
  const [cartCount,    setCartCount]    = useState(0)
  const [totalPrice,   setTotalPrice]   = useState(0)
  const [cartLoading,  setCartLoading]  = useState(false)

  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  )

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  // Sync with API on token change
  useEffect(() => {
    if (token) fetchCart()
    else {
      setCartItems([])
      setCartId(null)
      setCartCount(0)
      setTotalPrice(0)
    }
  }, [token])

  async function fetchCart() {
    setCartLoading(true)
    try {
      const { data } = await axios.get(`${BASE}/cart`, {
        headers: { token }
      })
      setCartItems(data.data?.products || [])
      setCartId(data.data?._id)
      setCartCount(data.numOfCartItems || 0)
      setTotalPrice(data.data?.totalCartPrice || 0)
    } catch {
      setCartItems([])
      setCartCount(0)
    } finally {
      setCartLoading(false)
    }
  }

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        `${BASE}/cart`,
        { productId },
        { headers: { token } }
      )
      setCartItems(data.data?.products || [])
      setCartCount(data.numOfCartItems || 0)
      setTotalPrice(data.data?.totalCartPrice || 0)
      setCartId(data.data?._id)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message }
    }
  }

  async function removeFromCart(cartItemId) {
    try {
      const { data } = await axios.delete(
        `${BASE}/cart/${cartItemId}`,
        { headers: { token } }
      )
      setCartItems(data.data?.products || [])
      setCartCount(data.numOfCartItems || 0)
      setTotalPrice(data.data?.totalCartPrice || 0)
      setCartId(data.data?._id)
    } catch (err) {
      console.error('Remove error:', err.response?.data)
    }
  }

  async function updateQuantity(cartItemId, count) {
    if (count < 1) return removeFromCart(cartItemId)
    try {
      const { data } = await axios.put(
        `${BASE}/cart/${cartItemId}`,
        { count },
        { headers: { token } }
      )
      setCartItems(data.data?.products || [])
      setCartCount(data.numOfCartItems || 0)
      setTotalPrice(data.data?.totalCartPrice || 0)
    } catch (err) {
      console.error('Update error:', err.response?.data)
    }
  }

  function toggleWishlist(product) {
    setWishlistItems(prev => {
      const exists = prev.find(item => item._id === product._id)
      if (exists) return prev.filter(item => item._id !== product._id)
      return [...prev, product]
    })
  }

  function isInWishlist(productId) {
    return wishlistItems.some(item => item._id === productId)
  }

  function isInCart(productId) {
    return cartItems.some(item => item.product?._id === productId)
  }


  return (
    <CartContext.Provider value={{
      cartItems, wishlistItems, cartCount, cartId, totalPrice, cartLoading,
      addToCart, removeFromCart, updateQuantity, toggleWishlist,
      isInWishlist, isInCart, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  )
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  function login(userToken, userData) {
    localStorage.setItem('token', userToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(userToken)
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  function updateUser(updatedData) {
    const newUser = { ...user, ...updatedData }
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/Autenticar'

// Ruta que requiere estar logueado
export function RutaPrivada({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

// Ruta que requiere ser admin
export function RutaAdmin({ children }) {
  const { isAdmin, loadingProfile } = useAuth()
  if (loadingProfile) return null
  return isAdmin ? children : <Navigate to="/" />
}
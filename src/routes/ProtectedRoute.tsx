// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/modules/auth/useAuth'

export default function ProtectedRoute({ children }: any) {
  const { user } = useAuth()

  if (user === null) return <div>Loading...</div>

  return user ? children : <Navigate to="/login" />
}
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { DashboardPage } from './pages/DashboardPage'
import { AddTransactionPage } from './pages/AddTransactionPage'
import { HistoryPage } from './pages/HistoryPage'
import { ProfilePage } from './pages/ProfilePage'
import { Icon } from './components/ui/Icon'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <span className="animate-spin"><Icon name="progress_activity" className="text-primary" size={36} /></span>
      </div>
    )
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" replace /> : <ForgotPasswordPage />} />

        {/* App */}
        <Route element={<PrivateRoute><AppLayout user={user} /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add" element={<AddTransactionPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

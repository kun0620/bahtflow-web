// src/pages/Login.tsx
import { useState } from 'react'
import { login } from '@/modules/auth/auth.service'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await login(email, password)
      navigate('/app')
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 shadow rounded w-80 space-y-4">
        <h1 className="text-xl font-bold">BahtFlow</h1>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2"
        >
          Login
        </button>
      </div>
    </div>
  )
}
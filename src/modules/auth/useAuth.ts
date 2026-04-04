// src/modules/auth/useAuth.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/core/supabase'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return { user, loading }
}
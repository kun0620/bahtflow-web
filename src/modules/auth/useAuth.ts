// src/modules/auth/useAuth.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/core/supabase'

export function useAuth() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return { user }
}
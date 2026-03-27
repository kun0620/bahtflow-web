// src/modules/auth/auth.service.ts
import { supabase } from '@/core/supabase'

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
}
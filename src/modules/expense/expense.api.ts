// src/modules/expense/expense.api.ts
import { supabase } from '@/core/supabase'

export async function getTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
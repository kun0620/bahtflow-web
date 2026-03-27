// src/modules/expense/expense.api.ts
import { supabase } from '@/core/supabase'

interface AddTransactionInput {
  amount: number
  type: 'income' | 'expense'
  category: string
  note?: string
}

export async function getTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function addTransaction(input: AddTransactionInput) {
  const { data, error } = await supabase
    .from('transactions')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data
}
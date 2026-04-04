// src/modules/expense/expense.api.ts
import { supabase } from '@/core/supabase'

export interface AddTransactionInput {
  amount: number
  type: 'income' | 'expense'
  category: string
  note?: string
}

export interface UpdateTransactionInput {
  amount?: number
  type?: 'income' | 'expense'
  category?: string
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
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('transactions')
    .insert({ ...input, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTransaction(id: string, input: UpdateTransactionInput) {
  const { data, error } = await supabase
    .from('transactions')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)

  if (error) throw error
}
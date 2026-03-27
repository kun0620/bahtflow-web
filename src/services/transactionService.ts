import { supabase } from '../lib/supabase'
import type { Transaction, TransactionType } from '../types'

export interface CreateTransactionInput {
  type: TransactionType
  amount: number
  category_id: string
  note?: string
  date: string
}

export const transactionService = {
  async getAll(userId: string, month?: string) {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })

    if (month) {
      const [year, m] = month.split('-')
      const startDate = `${year}-${m}-01`
      const endDate = new Date(Number(year), Number(m), 0).toISOString().split('T')[0]
      query = query.gte('date', startDate).lte('date', endDate)
    }

    const { data, error } = await query
    if (error) throw error
    return (data ?? []) as Transaction[]
  },

  async create(userId: string, input: CreateTransactionInput) {
    const { data, error } = await supabase
      .from('transactions')
      .insert({ ...input, user_id: userId })
      .select()
      .single()
    if (error) throw error
    return data as Transaction
  },

  async update(id: string, input: Partial<CreateTransactionInput>) {
    const { data, error } = await supabase
      .from('transactions')
      .update(input)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as Transaction
  },

  async delete(id: string) {
    const { error } = await supabase.from('transactions').delete().eq('id', id)
    if (error) throw error
  },

  async getSummary(userId: string, month: string) {
    const transactions = await this.getAll(userId, month)
    const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return { totalIncome, totalExpense, totalBalance: totalIncome - totalExpense, transactions }
  },
}

export type TransactionType = 'expense' | 'income'

export interface Category {
  id: string
  name: string
  icon: string       // Material Symbol name
  color: string      // Tailwind bg class
  iconColor: string  // Tailwind text class
  user_id?: string
  is_default?: boolean
}

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  category_id: string
  category?: Category
  note?: string
  date: string       // ISO date string
  created_at: string
}

export interface TransactionSummary {
  totalBalance: number
  totalIncome: number
  totalExpense: number
}

export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
}

export type FilterType = 'all' | 'income' | 'expense'

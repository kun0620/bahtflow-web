import type { Category } from '../types'

export const DEFAULT_EXPENSE_CATEGORIES: Category[] = [
  { id: 'food',       name: 'Food',       icon: 'restaurant',     color: 'bg-red-100',    iconColor: 'text-red-500' },
  { id: 'transport',  name: 'Transport',  icon: 'directions_car', color: 'bg-blue-100',   iconColor: 'text-blue-500' },
  { id: 'shopping',   name: 'Shopping',   icon: 'shopping_bag',   color: 'bg-purple-100', iconColor: 'text-purple-500' },
  { id: 'rent',       name: 'Rent',       icon: 'home',           color: 'bg-orange-100', iconColor: 'text-orange-500' },
  { id: 'bills',      name: 'Bills',      icon: 'receipt_long',   color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  { id: 'health',     name: 'Health',     icon: 'local_hospital', color: 'bg-green-100',  iconColor: 'text-green-500' },
  { id: 'fun',        name: 'Fun',        icon: 'sports_esports', color: 'bg-pink-100',   iconColor: 'text-pink-500' },
  { id: 'internet',   name: 'Internet',   icon: 'language',       color: 'bg-cyan-100',   iconColor: 'text-cyan-500' },
  { id: 'gift',       name: 'Gift',       icon: 'card_giftcard',  color: 'bg-rose-100',   iconColor: 'text-rose-500' },
  { id: 'other-exp',  name: 'Other',      icon: 'more_horiz',     color: 'bg-gray-100',   iconColor: 'text-gray-500' },
]

export const DEFAULT_INCOME_CATEGORIES: Category[] = [
  { id: 'salary',     name: 'Salary',     icon: 'payments',       color: 'bg-green-100',  iconColor: 'text-green-600' },
  { id: 'freelance',  name: 'Freelance',  icon: 'computer',       color: 'bg-teal-100',   iconColor: 'text-teal-600' },
  { id: 'investment', name: 'Investment', icon: 'trending_up',    color: 'bg-emerald-100',iconColor: 'text-emerald-600' },
  { id: 'gift-in',    name: 'Gift',       icon: 'card_giftcard',  color: 'bg-lime-100',   iconColor: 'text-lime-600' },
  { id: 'other-inc',  name: 'Other',      icon: 'more_horiz',     color: 'bg-gray-100',   iconColor: 'text-gray-500' },
]

export function getCategoryById(id: string): Category | undefined {
  return [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES].find(c => c.id === id)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateFull(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
}

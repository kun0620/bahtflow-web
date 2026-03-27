import { useState, useEffect, useCallback } from 'react'
import { transactionService } from '../services/transactionService'
import { getCategoryById } from '../lib/categories'
import type { Transaction } from '../types'

export function useTransactions(userId: string | undefined, month: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const totalBalance = totalIncome - totalExpense

  const fetch = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    setError(null)
    try {
      const data = await transactionService.getAll(userId, month)
      // attach category info from local defaults
      const enriched = data.map(t => ({
        ...t,
        category: getCategoryById(t.category_id),
      }))
      setTransactions(enriched)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }, [userId, month])

  useEffect(() => { fetch() }, [fetch])

  return { transactions, totalIncome, totalExpense, totalBalance, loading, error, refetch: fetch }
}

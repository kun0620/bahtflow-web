// src/modules/expense/useTransactions.ts
import { useEffect, useState } from 'react'
import { getTransactions } from './expense.api'
import { calculateSummary } from './expense.service'

export function useTransactions() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  })
  const [loading, setLoading] = useState(true)

  async function load() {
    const data = await getTransactions()
    setTransactions(data)
    setSummary(calculateSummary(data))
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return { transactions, summary, loading, reload: load }
}
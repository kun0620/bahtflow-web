// src/modules/dashboard/ChartSection.tsx
import { useState } from 'react'
import { useTransactions } from '@/modules/expense/useTransactions'

export default function ChartSection() {
  const { transactions } = useTransactions()
  const [activeType, setActiveType] = useState<'income' | 'expense'>('expense')

  // Calculate daily totals for the past 7 days
  const getDailyData = () => {
    const today = new Date()
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const data = days.map((day, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() - (6 - i))

      const dayTotal = transactions
        .filter(t => {
          const tDate = new Date(t.created_at)
          return (
            tDate.toDateString() === date.toDateString() &&
            t.type === activeType
          )
        })
        .reduce((sum, t) => sum + t.amount, 0)

      return { day, amount: dayTotal }
    })
    return data
  }

  const chartData = getDailyData()
  const maxAmount = Math.max(...chartData.map(d => d.amount), 1)

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-on-surface font-headline">Weekly Overview</h2>

        {/* Toggle Pills */}
        <div className="flex gap-2 bg-surface-container-low p-1 rounded-full">
          <button
            onClick={() => setActiveType('income')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeType === 'income'
                ? 'bg-secondary text-on-secondary'
                : 'text-on-surface-variant'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setActiveType('expense')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeType === 'expense'
                ? 'bg-tertiary text-on-tertiary'
                : 'text-on-surface-variant'
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-surface-container-low rounded-2xl p-8">
        <div className="flex items-end justify-around h-64 gap-2">
          {chartData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 flex-1">
              {/* Bar */}
              <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full max-w-10 flex items-end justify-center" style={{ height: '200px' }}>
                  <div
                    className={`w-full rounded-t-xl transition-all ${
                      activeType === 'income'
                        ? 'bg-secondary'
                        : 'bg-tertiary'
                    }`}
                    style={{
                      height: `${(item.amount / maxAmount) * 100}%`,
                      minHeight: item.amount > 0 ? '4px' : '0px'
                    }}
                  />
                </div>
              </div>

              {/* Label */}
              <span className="text-xs font-medium text-on-surface-variant">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
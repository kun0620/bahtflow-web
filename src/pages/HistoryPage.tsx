// src/pages/HistoryPage.tsx
import { useTransactions } from '@/modules/expense/useTransactions'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

const CATEGORY_ICONS: Record<string, string> = {
  home: 'home',
  restaurant: 'restaurant',
  transport: 'directions_car',
  utilities: 'water_damage',
  entertainment: 'movie',
  shopping: 'shopping_bag',
  healthcare: 'local_hospital',
  other: 'more_horiz',
}

export function HistoryPage() {
  const { transactions, loading } = useTransactions()
  const navigate = useNavigate()
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')

  const filtered = filterType === 'all'
    ? transactions
    : transactions.filter(t => t.type === filterType)

  if (loading) {
    return <div className="p-6 text-center text-on-surface-variant">Loading...</div>
  }

  // Calculate monthly stats
  const monthlyIncome = filtered
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const monthlyExpense = filtered
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const monthlyBalance = monthlyIncome - monthlyExpense

  return (
    <div className="space-y-8">

      {/* Filters */}
      <div className="space-y-4">
        {/* Period Filter */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-surface-container-low text-on-surface text-sm font-medium hover:bg-surface-container-high transition-colors">
              July
            </button>
            <button className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-surface-container-low transition-colors">
              June
            </button>
            <button className="px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-surface-container-low transition-colors">
              May
            </button>
          </div>
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <Icon name="calendar_month" size={20} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Type Filter Pills */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterType === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('income')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterType === 'income'
                ? 'bg-secondary text-on-secondary'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilterType('expense')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filterType === 'expense'
                ? 'bg-tertiary text-on-tertiary'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-low rounded-3xl p-8 space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 px-4 py-2 text-xs uppercase tracking-[0.1em] font-bold text-on-surface-variant">
          <span>Date</span>
          <span>Category</span>
          <span className="text-right">Amount (฿)</span>
          <span>Note</span>
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">
              No transactions found
            </div>
          ) : (
            filtered.map((t: any) => {
              const categoryKey = (t.category || 'other').toLowerCase()
              const iconName = CATEGORY_ICONS[categoryKey] || CATEGORY_ICONS.other
              const isExpense = t.type === 'expense'

              return (
                <div
                  key={t.id}
                  className="grid grid-cols-4 gap-4 bg-surface-container-lowest rounded-2xl p-4 items-center hover:bg-surface-container-high transition-colors"
                >
                  {/* Date */}
                  <div className="text-sm text-on-surface-variant">
                    {new Date(t.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isExpense ? 'bg-tertiary-fixed' : 'bg-secondary-fixed'
                    }`}>
                      <Icon
                        name={iconName}
                        size={18}
                        className={isExpense ? 'text-tertiary' : 'text-secondary'}
                      />
                    </div>
                    <span className="font-medium text-on-surface capitalize">
                      {t.category || 'Other'}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className={`text-right font-bold font-headline tabular-nums ${
                    isExpense ? 'text-tertiary' : 'text-secondary'
                  }`}>
                    {isExpense ? '-' : '+'} ฿{t.amount.toLocaleString()}
                  </div>

                  {/* Note */}
                  <div className="text-sm text-on-surface-variant truncate">
                    {t.note || '-'}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Load More */}
        {filtered.length > 10 && (
          <button className="w-full py-3 text-primary font-medium hover:underline mt-4">
            Load older transactions
          </button>
        )}
      </div>

      {/* Summary Bento */}
      <div className="grid grid-cols-3 gap-4">
        {/* Monthly Income */}
        <div className="bg-surface-container-low rounded-2xl p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.1em] font-semibold text-on-surface-variant">
            Monthly Income
          </p>
          <p className="text-2xl font-extrabold text-secondary font-headline tabular-nums">
            ฿ {monthlyIncome.toLocaleString()}
          </p>
        </div>

        {/* Monthly Expense */}
        <div className="bg-surface-container-low rounded-2xl p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.1em] font-semibold text-on-surface-variant">
            Monthly Expense
          </p>
          <p className="text-2xl font-extrabold text-tertiary font-headline tabular-nums">
            ฿ {monthlyExpense.toLocaleString()}
          </p>
        </div>

        {/* Remaining Balance */}
        <div className="bg-surface-container-low rounded-2xl p-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.1em] font-semibold text-on-surface-variant">
            Remaining Balance
          </p>
          <p className={`text-2xl font-extrabold font-headline tabular-nums ${
            monthlyBalance >= 0 ? 'text-secondary' : 'text-tertiary'
          }`}>
            ฿ {monthlyBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/add')}
        className="fixed bottom-8 right-8 md:bottom-10 md:right-10 w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shadow-lg"
      >
        <Icon name="add" size={32} className="text-on-primary" />
      </button>

    </div>
  )
}

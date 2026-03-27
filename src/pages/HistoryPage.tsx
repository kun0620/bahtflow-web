import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTransactions } from '../hooks/useTransactions'
import { CategoryIcon } from '../components/ui/CategoryIcon'
import { Icon } from '../components/ui/Icon'
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal'
import { AddTransactionModal } from '../components/modals/AddTransactionModal'
import { formatCurrency } from '../lib/categories'
import type { FilterType, Transaction } from '../types'

function getMonthLabel(month: string) {
  const [year, m] = month.split('-')
  return new Date(Number(year), Number(m) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function prevMonth(month: string) {
  const [y, m] = month.split('-').map(Number)
  const d = new Date(y, m - 2)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function nextMonth(month: string) {
  const [y, m] = month.split('-').map(Number)
  const d = new Date(y, m)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function groupByDate(transactions: Transaction[]) {
  const groups: Record<string, Transaction[]> = {}
  for (const tx of transactions) {
    if (!groups[tx.date]) groups[tx.date] = []
    groups[tx.date].push(tx)
  }
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
}

function formatGroupDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString())
    return { label: 'TODAY, ' + date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }).toUpperCase(), date }
  if (date.toDateString() === yesterday.toDateString())
    return { label: 'YESTERDAY, ' + date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }).toUpperCase(), date }
  return { label: date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase(), date }
}

export function HistoryPage() {
  const { user } = useAuth()
  const [month, setMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })
  const [filter, setFilter] = useState<FilterType>('all')
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const { transactions, loading, refetch } = useTransactions(user?.id, month)

  const filtered = transactions.filter(tx => filter === 'all' || tx.type === filter)
  const groups = groupByDate(filtered)

  return (
    <div className="min-h-screen bg-surface pb-32 md:pb-10">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 h-16 bg-surface sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <Icon name="menu" className="text-primary" size={22} />
          </button>
          <h1 className="text-xl font-bold text-primary font-headline">Siam Ledger</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <Icon name="calendar_month" className="text-primary" size={22} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-6 space-y-6">
        {/* Title */}
        <section>
          <p className="text-on-surface-variant font-medium text-xs mb-1 uppercase tracking-widest">Financial Records</p>
          <h2 className="text-4xl font-extrabold font-headline text-primary tracking-tight">History</h2>
        </section>

        {/* Month Picker */}
        <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-2xl">
          <button onClick={() => setMonth(prevMonth(month))} className="p-2 hover:bg-surface-container-high rounded-xl transition-all active:scale-90">
            <Icon name="chevron_left" className="text-primary" size={22} />
          </button>
          <span className="text-base font-bold text-primary font-headline">{getMonthLabel(month)}</span>
          <button onClick={() => setMonth(nextMonth(month))} className="p-2 hover:bg-surface-container-high rounded-xl transition-all active:scale-90">
            <Icon name="chevron_right" className="text-primary" size={22} />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bg-surface-container-low p-1.5 rounded-full flex">
          {(['all', 'income', 'expense'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all capitalize
                ${filter === f ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Transaction Groups */}
        {loading ? (
          <div className="flex justify-center py-16">
            <span className="animate-spin"><Icon name="progress_activity" className="text-primary" size={32} /></span>
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20">
            <Icon name="auto_awesome" className="text-outline/30" size={48} />
            <p className="text-sm text-outline/60">No records for {getMonthLabel(month)}</p>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {groups.map(([date, txs]) => {
              const { label } = formatGroupDate(date)
              const dailyBalance = txs.reduce((s, t) => t.type === 'income' ? s + t.amount : s - t.amount, 0)
              return (
                <div key={date}>
                  {/* Date Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-on-surface-variant tracking-wider">{label}</span>
                    <span className={`text-xs font-bold tabular-nums ${dailyBalance >= 0 ? 'text-secondary' : 'text-tertiary'}`}>
                      Daily Balance: {dailyBalance >= 0 ? '+' : ''}฿{formatCurrency(dailyBalance)}
                    </span>
                  </div>
                  {/* Transactions */}
                  <div className="space-y-2">
                    {txs.map(tx => (
                      <button
                        key={tx.id}
                        onClick={() => setDeleteTarget(tx)}
                        className="w-full flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors active:scale-[0.99] text-left"
                      >
                        <CategoryIcon category={tx.category} size="md" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-on-surface truncate">{tx.note || tx.category?.name || tx.category_id}</p>
                          <p className="text-xs text-on-surface-variant">
                            {tx.category?.name} • {new Date(tx.date + 'T00:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <p className={`text-sm font-bold tabular-nums ${tx.type === 'income' ? 'text-secondary' : 'text-tertiary'}`}>
                          {tx.type === 'income' ? '+' : '-'}฿{formatCurrency(tx.amount)}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* End of records */}
            <div className="flex flex-col items-center gap-2 py-8 opacity-40">
              <Icon name="auto_awesome" className="text-primary" size={28} />
              <p className="text-xs text-on-surface-variant">End of records for {getMonthLabel(month)}</p>
            </div>
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 md:bottom-8 w-14 h-14 bg-primary rounded-full shadow-float flex items-center justify-center active:scale-90 transition-all z-40"
      >
        <Icon name="add" className="text-on-primary" size={28} />
      </button>

      {deleteTarget && (
        <DeleteConfirmModal
          transaction={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onSuccess={() => { setDeleteTarget(null); refetch() }}
        />
      )}

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); refetch() }}
        />
      )}
    </div>
  )
}

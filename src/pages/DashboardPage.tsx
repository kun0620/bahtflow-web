import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTransactions } from '../hooks/useTransactions'
import { CategoryIcon } from '../components/ui/CategoryIcon'
import { Icon } from '../components/ui/Icon'
import { AddTransactionModal } from '../components/modals/AddTransactionModal'
import { formatCurrency, formatDate } from '../lib/categories'

function getCurrentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [month] = useState(getCurrentMonth())
  const [showAddModal, setShowAddModal] = useState(false)

  const { transactions, totalBalance, totalIncome, totalExpense, loading, refetch } = useTransactions(user?.id, month)

  const recent = transactions.slice(0, 5)

  return (
    <div className="min-h-screen bg-surface pb-32 md:pb-10">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 h-16 bg-surface sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95">
            <Icon name="menu" className="text-primary" size={22} />
          </button>
          <h1 className="text-xl font-bold text-primary tracking-tight font-headline">Siam Ledger</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95">
          <Icon name="calendar_month" className="text-primary" size={22} />
        </button>
      </header>

      <main className="px-6 pt-4 space-y-8 max-w-2xl mx-auto">
        {/* Balance Card */}
        <section className="w-full bg-surface-container-highest rounded-3xl p-8 shadow-editorial relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <span className="text-on-surface-variant font-label text-xs font-medium tracking-widest uppercase">Total Balance</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-primary/60 font-headline">฿</span>
              <h2 className="text-5xl font-extrabold text-primary font-headline tabular-nums tracking-tighter">
                {loading ? '—' : formatCurrency(totalBalance).replace('.00', '')}
              </h2>
            </div>
          </div>
          {/* Income / Expense row */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-surface-container-lowest p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="arrow_downward" className="text-secondary" size={18} />
                <span className="text-on-surface-variant font-label text-xs font-medium">Income</span>
              </div>
              <p className="text-xl font-extrabold text-secondary font-headline tabular-nums">
                ฿{formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="arrow_upward" className="text-tertiary" size={18} />
                <span className="text-on-surface-variant font-label text-xs font-medium">Expense</span>
              </div>
              <p className="text-xl font-extrabold text-tertiary font-headline tabular-nums">
                ฿{formatCurrency(totalExpense)}
              </p>
            </div>
          </div>
        </section>

        {/* Analysis placeholder */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface font-headline">Analysis</h2>
            <button className="text-sm font-semibold text-primary hover:underline">View Insights</button>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-10 flex flex-col items-center justify-center gap-3">
            <Icon name="bar_chart" className="text-outline/40" size={40} />
            <p className="text-sm text-outline/60">Spending chart will appear here</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-on-surface font-headline">Recent Activity</h2>
            <button onClick={() => navigate('/history')} className="text-sm font-semibold text-primary hover:underline">
              View All
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="animate-spin"><Icon name="progress_activity" className="text-primary" size={28} /></span>
            </div>
          ) : recent.length === 0 ? (
            <div className="bg-surface-container-low rounded-3xl p-10 flex flex-col items-center gap-3">
              <Icon name="receipt_long" className="text-outline/40" size={40} />
              <p className="text-sm text-outline/60">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map(tx => (
                <div key={tx.id} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl active:scale-[0.99] transition-transform">
                  <CategoryIcon category={tx.category} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">{tx.category?.name ?? tx.category_id}</p>
                    <p className="text-xs text-on-surface-variant">{formatDate(tx.date)}</p>
                  </div>
                  <p className={`text-sm font-bold tabular-nums ${tx.type === 'income' ? 'text-secondary' : 'text-on-surface'}`}>
                    {tx.type === 'income' ? '+' : ''}฿{formatCurrency(tx.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FAB */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 md:bottom-8 w-14 h-14 bg-primary rounded-full shadow-float flex items-center justify-center active:scale-90 transition-all z-40"
      >
        <Icon name="add" className="text-on-primary" size={28} />
      </button>

      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); refetch() }}
        />
      )}
    </div>
  )
}

import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { transactionService } from '../../services/transactionService'
import { DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES } from '../../lib/categories'
import { Icon } from '../ui/Icon'
import type { TransactionType, Category } from '../../types'

interface Props {
  onClose: () => void
  onSuccess: () => void
  initialType?: TransactionType
}

export function AddTransactionModal({ onClose, onSuccess, initialType = 'expense' }: Props) {
  const { user } = useAuth()
  const [type, setType] = useState<TransactionType>(initialType)
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = type === 'expense' ? DEFAULT_EXPENSE_CATEGORIES : DEFAULT_INCOME_CATEGORIES

  async function handleSave() {
    if (!user) return
    if (!amount || Number(amount) <= 0) { setError('Please enter a valid amount'); return }
    if (!categoryId) { setError('Please select a category'); return }

    setLoading(true)
    setError('')
    try {
      await transactionService.create(user.id, {
        type,
        amount: Number(amount),
        category_id: categoryId,
        date,
        note: note || undefined,
      })
      onSuccess()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  function CategoryBtn({ cat }: { cat: Category }) {
    const selected = categoryId === cat.id
    return (
      <button
        onClick={() => setCategoryId(cat.id)}
        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all active:scale-95
          ${selected
            ? type === 'expense'
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-secondary-container text-on-secondary-container'
            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
          }`}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 24, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
        >
          {cat.icon}
        </span>
        <span className="text-xs font-medium">{cat.name}</span>
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Sheet — slides up from bottom on mobile, centered on desktop */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50">
        <div className="bg-surface-container-lowest rounded-t-3xl md:rounded-3xl w-full md:max-w-lg shadow-editorial animate-slide-up md:animate-fade-in max-h-[95vh] overflow-y-auto">
          {/* Handle */}
          <div className="flex justify-center pt-4 pb-2 md:hidden">
            <div className="w-12 h-1.5 bg-outline-variant rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-bold text-primary font-headline">New Transaction</h2>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
              <Icon name="close" className="text-primary" size={20} />
            </button>
          </div>

          <div className="px-6 pb-8 space-y-6">
            {/* Type Toggle */}
            <div className="bg-surface-container-low p-1.5 rounded-full flex">
              {(['expense', 'income'] as TransactionType[]).map(t => (
                <button
                  key={t}
                  onClick={() => { setType(t); setCategoryId('') }}
                  className={`flex-1 py-3 px-6 rounded-full text-sm font-semibold transition-all duration-200 capitalize
                    ${type === t ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Amount */}
            <section className="bg-surface-container-highest rounded-3xl p-8 flex flex-col items-center justify-center space-y-2">
              <span className="text-xs font-medium text-primary uppercase tracking-widest opacity-70">Amount</span>
              <div className="flex items-baseline justify-center">
                <span className="text-3xl font-headline font-bold text-outline mr-2">฿</span>
                <input
                  autoFocus
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0"
                  className="bg-transparent border-none text-center focus:ring-0 p-0 text-6xl font-headline font-extrabold text-on-surface w-full max-w-[250px] outline-none"
                />
              </div>
            </section>

            {/* Category */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-on-surface-variant">Category</h3>
              <div className="grid grid-cols-3 gap-3">
                {categories.map(cat => <CategoryBtn key={cat.id} cat={cat} />)}
                <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-outline-variant text-on-surface-variant opacity-60">
                  <Icon name="add" size={22} />
                  <span className="text-xs font-medium">New</span>
                </button>
              </div>
            </section>

            {/* Date */}
            <section className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-variant">Date</label>
              <div className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-3">
                <Icon name="calendar_today" className="text-primary" size={20} />
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-on-surface flex-1 outline-none"
                />
              </div>
            </section>

            {/* Note */}
            <section className="space-y-2">
              <label className="text-sm font-semibold text-on-surface-variant">Note (Optional)</label>
              <div className="bg-surface-container-low rounded-2xl p-4 flex items-start gap-3">
                <Icon name="notes" className="text-primary mt-0.5" size={20} />
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="What was this for?"
                  rows={2}
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm w-full placeholder:text-outline/60 outline-none resize-none text-on-surface"
                />
              </div>
            </section>

            {/* Smart Ledger badge */}
            <div className="rounded-3xl p-5 bg-primary-container text-on-primary-container flex items-center justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-base font-bold">Smart Ledger</h3>
                <p className="text-xs opacity-80 max-w-[200px]">Transactions are automatically synced to your monthly report.</p>
              </div>
              <Icon name="auto_awesome" className="text-4xl opacity-20 absolute -right-2 -bottom-2" size={48} filled />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full py-5 bg-primary text-on-primary font-bold text-lg rounded-full shadow-float flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
            >
              {loading
                ? <span className="animate-spin"><Icon name="progress_activity" size={22} /></span>
                : <><Icon name="check" size={22} /><span>Save Transaction</span></>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

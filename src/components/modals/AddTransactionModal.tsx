// src/components/modals/AddTransactionModal.tsx
import { useState } from 'react'
import { Icon } from '../ui/Icon'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    amount: number
    type: 'income' | 'expense'
    category: string
    note: string
  }) => Promise<void>
}

export function AddTransactionModal({
  isOpen,
  onClose,
  onSubmit,
}: AddTransactionModalProps) {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !category) return

    setLoading(true)
    try {
      await onSubmit({
        amount: Number(amount),
        type,
        category,
        note,
      })
      // Reset form
      setAmount('')
      setType('expense')
      setCategory('')
      setNote('')
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface-lowest rounded-2xl shadow-2xl max-w-md w-full space-y-6 p-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-on-surface font-headline">
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
          >
            <Icon name="close" size={24} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Amount */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              Amount (฿)
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              step="0.01"
              required
            />
          </div>

          {/* Type Toggle */}
          <div className="flex gap-2 bg-surface-container-lowest p-1 rounded-full">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                type === 'expense'
                  ? 'bg-tertiary text-on-tertiary'
                  : 'text-on-surface-variant'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                type === 'income'
                  ? 'bg-secondary text-on-secondary'
                  : 'text-on-surface-variant'
              }`}
            >
              Income
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            >
              <option value="">Select category...</option>
              <option value="Lunch">Lunch</option>
              <option value="Grab">Grab</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add details..."
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              rows={2}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-outline-variant/40 rounded-full text-on-surface font-medium hover:bg-surface-container-low transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-primary text-on-primary rounded-full font-bold font-headline hover:bg-primary-container disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

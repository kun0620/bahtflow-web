// src/pages/AddTransactionPage.tsx
import { useState } from 'react'
import { addTransaction } from '@/modules/expense/expense.api'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

const QUICK_CATEGORIES = [
  { name: 'Lunch', icon: 'restaurant' },
  { name: 'Grab', icon: 'directions_car' },
  { name: '7-Eleven', icon: 'shopping_bag' },
  { name: 'Coffee', icon: 'local_cafe' },
]

export function AddTransactionPage() {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!amount || !category) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      await addTransaction({
        amount: Number(amount),
        type,
        category,
        note,
      })
      navigate('/history')
    } catch (err: any) {
      setError(err.message || 'Failed to save transaction')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickCategory = (catName: string) => {
    setCategory(catName)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* Big Amount Input Section */}
      <div className="text-center space-y-6">
        <div className="text-7xl font-light text-on-surface-variant italic">
          ฿
        </div>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0"
          className="w-full text-center text-8xl font-extrabold text-on-surface font-headline tabular-nums bg-transparent border-none focus:outline-none placeholder-on-surface-variant/30"
          step="0.01"
          required
        />
        <p className="text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold">
          Transaction Amount
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-surface-container-low rounded-2xl p-8 space-y-6">

        {error && (
          <div className="bg-error-container border border-error text-error px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        {/* Income/Expense Toggle */}
        <div className="flex gap-3 bg-surface-container-lowest p-1 rounded-full">
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

        {/* Category Dropdown */}
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
            <option value="">Select a category...</option>
            <option value="Lunch">Lunch</option>
            <option value="Grab">Grab</option>
            <option value="7-Eleven">7-Eleven</option>
            <option value="Coffee">Coffee</option>
            <option value="Home">Home</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date + Payment Method Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
            Description (optional)
          </label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Add any notes about this transaction..."
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 px-4 py-3 border border-outline-variant/40 rounded-full text-on-surface font-medium hover:bg-surface-container-lowest transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-3 bg-primary text-on-primary rounded-full font-bold font-headline flex items-center justify-center gap-2 hover:bg-primary-container disabled:opacity-50 transition-colors"
          >
            <Icon name="task_alt" size={20} className="text-on-primary" />
            {loading ? 'Saving...' : 'Save Transaction'}
          </button>
        </div>

      </form>

      {/* Recent Categories Quick Select */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant">
          Quick Select
        </p>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_CATEGORIES.map(cat => (
            <button
              key={cat.name}
              type="button"
              onClick={() => handleQuickCategory(cat.name)}
              className={`py-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                category === cat.name
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <Icon name={cat.icon} size={24} />
              <span className="text-xs font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-on-surface-variant">
        🔒 Your transactions are encrypted and secure
      </div>

    </div>
  )
}

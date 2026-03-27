import { useState } from 'react'
import { transactionService } from '../../services/transactionService'
import { Icon } from '../ui/Icon'
import { formatCurrency } from '../../lib/categories'
import type { Transaction } from '../../types'

interface Props {
  transaction: Transaction
  onClose: () => void
  onSuccess: () => void
}

export function DeleteConfirmModal({ transaction, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await transactionService.delete(transaction.id)
      onSuccess()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface-container-lowest w-full max-w-md rounded-3xl shadow-editorial animate-fade-in overflow-hidden">
          <div className="p-8">
            {/* Icon */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-4">
                <Icon name="delete" className="text-error" size={32} />
              </div>
              <h2 className="text-xl font-bold text-on-surface">Confirm Deletion</h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                Are you sure you want to delete this transaction? This action cannot be undone.
              </p>
            </div>

            {/* Transaction info */}
            <div className="bg-surface-container-low rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm uppercase">
                    {(transaction.category?.name ?? transaction.category_id).slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">Category</p>
                  <p className="text-sm font-semibold text-on-surface">{transaction.category?.name ?? transaction.category_id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">Amount</p>
                <p className="text-base font-bold text-on-surface">฿{formatCurrency(transaction.amount)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-4 border border-outline-variant rounded-full text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-4 bg-tertiary-container text-on-tertiary-container rounded-full text-sm font-bold hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading
                  ? <span className="animate-spin"><Icon name="progress_activity" size={18} /></span>
                  : 'Delete Transaction'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

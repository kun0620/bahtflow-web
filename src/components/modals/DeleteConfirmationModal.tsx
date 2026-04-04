// src/components/modals/DeleteConfirmationModal.tsx
import { Icon } from '../ui/Icon'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  title: string
  description: string
  amount?: number
  category?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export function DeleteConfirmationModal({
  isOpen,
  title,
  description,
  amount,
  category,
  onConfirm,
  onCancel,
  loading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface-lowest rounded-2xl shadow-2xl max-w-sm w-full space-y-6 p-8">

        {/* Red Trash Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center">
            <Icon name="delete" size={32} className="text-error" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-on-surface font-headline">
            {title}
          </h2>
          <p className="text-sm text-on-surface-variant">
            {description}
          </p>
        </div>

        {/* Transaction Preview */}
        {amount && category && (
          <div className="bg-surface-container-lowest rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-error-container flex items-center justify-center">
                  <span className="font-bold text-error text-sm">
                    {category[0].toUpperCase()}
                  </span>
                </div>
                <span className="font-medium text-on-surface capitalize">
                  {category}
                </span>
              </div>
              <span className="font-bold text-error tabular-nums">
                ฿ {amount.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-outline-variant/40 rounded-full text-on-surface font-medium hover:bg-surface-container-low transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-error text-on-error rounded-full font-bold font-headline hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Deleting...' : 'Delete Transaction'}
          </button>
        </div>

      </div>
    </div>
  )
}

// src/components/modals/CategoryModal.tsx
import { useState } from 'react'
import { Icon } from '../ui/Icon'

interface Category {
  name: string
  transactionCount: number
}

interface CategoryModalProps {
  isOpen: boolean
  categories: Category[]
  onClose: () => void
  onAddCategory: (name: string) => Promise<void>
  onSave: () => Promise<void>
}

export function CategoryModal({
  isOpen,
  categories,
  onClose,
  onAddCategory,
  onSave,
}: CategoryModalProps) {
  const [newCategory, setNewCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return

    setLoading(true)
    try {
      await onAddCategory(newCategory)
      setNewCategory('')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await onSave()
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
            Manage Categories
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
          >
            <Icon name="close" size={24} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-on-surface-variant">
          Organize your transactions with custom categories
        </p>

        {/* Add Category Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="New category..."
            className="flex-1 px-4 py-2 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleAddCategory()
              }
            }}
          />
          <button
            onClick={handleAddCategory}
            disabled={loading || !newCategory.trim()}
            className="px-3 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary-container disabled:opacity-50 transition-colors"
          >
            <Icon name="add" size={20} className="text-on-primary" />
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Icon name="folder" size={20} className="text-on-surface-variant" />
                <div>
                  <p className="font-medium text-on-surface capitalize">
                    {cat.name}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {cat.transactionCount} transactions
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-outline-variant/40 rounded-full text-on-surface font-medium hover:bg-surface-container-low transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-primary text-on-primary rounded-full font-bold font-headline hover:bg-primary-container disabled:opacity-50 transition-colors"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  )
}

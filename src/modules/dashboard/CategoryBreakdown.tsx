// src/modules/dashboard/CategoryBreakdown.tsx
import { useTransactions } from '@/modules/expense/useTransactions'
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

export default function CategoryBreakdown() {
  const { transactions } = useTransactions()

  // Calculate spending by category (expenses only)
  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      const cat = t.category || 'Other'
      acc[cat] = (acc[cat] || 0) + t.amount
      return acc
    }, {})

  const totalExpense = Object.values(categorySpending).reduce((a, b) => a + b, 0)

  const sortedCategories = Object.entries(categorySpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  if (sortedCategories.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-on-surface font-headline uppercase tracking-[0.1em]">
        Top Spending
      </h2>

      <div className="space-y-4">
        {sortedCategories.map(([category, amount]) => {
          const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0
          const categoryKey = category.toLowerCase()
          const iconName = CATEGORY_ICONS[categoryKey] || CATEGORY_ICONS.other

          return (
            <div key={category} className="space-y-2">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-surface-container-highest rounded-lg">
                    <Icon
                      name={iconName}
                      size={18}
                      className="text-on-surface-variant"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface capitalize">
                      {category}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {transactions.filter(t => t.category === category && t.type === 'expense').length} transactions
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-tertiary tabular-nums">
                  ฿ {amount.toLocaleString()}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Percentage */}
              <div className="text-xs text-on-surface-variant text-right">
                {percentage.toFixed(1)}%
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

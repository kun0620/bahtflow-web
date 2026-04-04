// src/modules/dashboard/RecentList.tsx
import { useNavigate } from 'react-router-dom'
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

export default function RecentList({ transactions }: any) {
  const navigate = useNavigate()

  const recentTransactions = transactions.slice(0, 5)

  if (recentTransactions.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-on-surface font-headline">Recent Transactions</h2>
        <div className="text-center py-12 text-on-surface-variant">
          No transactions yet
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-on-surface font-headline">Recent Transactions</h2>
        <button
          onClick={() => navigate('/history')}
          className="text-sm text-primary font-medium hover:underline"
        >
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {recentTransactions.map((t: any) => {
          const categoryKey = (t.category || 'other').toLowerCase()
          const iconName = CATEGORY_ICONS[categoryKey] || CATEGORY_ICONS.other
          const isExpense = t.type === 'expense'

          return (
            <div
              key={t.id}
              className="bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Icon Circle */}
                <div
                  className={`p-3 rounded-xl ${
                    isExpense
                      ? 'bg-tertiary-fixed'
                      : 'bg-secondary-fixed'
                  }`}
                >
                  <Icon
                    name={iconName}
                    size={20}
                    className={isExpense ? 'text-tertiary' : 'text-secondary'}
                  />
                </div>

                {/* Text */}
                <div>
                  <p className="font-medium text-on-surface capitalize">
                    {t.category || 'Other'}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {t.note || 'No description'}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p
                  className={`font-bold font-headline tabular-nums ${
                    isExpense
                      ? 'text-tertiary'
                      : 'text-secondary'
                  }`}
                >
                  {isExpense ? '-' : '+'}฿ {t.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-on-surface-variant">
                  {new Date(t.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
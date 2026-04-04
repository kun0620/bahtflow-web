// src/modules/dashboard/SummaryCards.tsx
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

export default function SummaryCards({ income, expense }: any) {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-3 gap-6">

      {/* Income Card */}
      <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between min-h-44">

        <div className="flex justify-between items-start">
          <div className="p-3 bg-secondary-container rounded-xl">
            <Icon name="arrow_downward" size={22} className="text-secondary" />
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em]">
            Total Income
          </span>
        </div>

        <div>
          <p className="text-3xl font-extrabold text-secondary font-headline tabular-nums">
            ฿ {income.toLocaleString()}
          </p>

          <div className="w-full bg-surface-container-highest h-1 rounded-full mt-4">
            <div className="bg-secondary h-full w-full rounded-full" />
          </div>
        </div>

      </div>

      {/* Expense Card */}
      <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between min-h-44">

        <div className="flex justify-between items-start">
          <div className="p-3 bg-tertiary-fixed rounded-xl">
            <Icon name="arrow_upward" size={22} className="text-tertiary" />
          </div>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em]">
            Total Expense
          </span>
        </div>

        <div>
          <p className="text-3xl font-extrabold text-tertiary font-headline tabular-nums">
            ฿ {expense.toLocaleString()}
          </p>

          <div className="w-full bg-surface-container-highest h-1 rounded-full mt-4">
            <div
              className="bg-tertiary h-full rounded-full"
              style={{ width: `${Math.min((expense / income) * 100, 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* CTA Card */}
      <button
        onClick={() => navigate('/add')}
        className="bg-primary rounded-2xl flex flex-col items-center justify-center text-on-primary cursor-pointer hover:bg-primary-container transition-colors min-h-44"
      >
        <Icon name="add_circle" size={48} className="text-on-primary mb-2" />
        <p className="text-sm font-bold font-headline">Add Transaction</p>
      </button>

    </div>
  )
}
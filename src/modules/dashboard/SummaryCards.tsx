// src/modules/dashboard/SummaryCards.tsx
export default function SummaryCards({ income, expense }: any) {
  return (
    <div className="grid grid-cols-3 gap-6">

      {/* Income */}
      <div className="bg-surface-low rounded-xl p-6 flex flex-col justify-between h-40">

        <div className="flex justify-between items-start">
          <div className="p-2 bg-green-200 rounded-lg">⬇</div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Total Income
          </span>
        </div>

        <div>
          <p className="text-2xl font-bold text-income">
            ฿ {income.toLocaleString()}
          </p>

          <div className="w-full bg-gray-200 h-1 rounded mt-3">
            <div className="bg-income h-full w-full" />
          </div>
        </div>

      </div>

      {/* Expense */}
      <div className="bg-surface-low rounded-xl p-6 flex flex-col justify-between h-40">

        <div className="flex justify-between items-start">
          <div className="p-2 bg-red-200 rounded-lg">⬆</div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">
            Total Expense
          </span>
        </div>

        <div>
          <p className="text-2xl font-bold text-expense">
            ฿ {expense.toLocaleString()}
          </p>

          <div className="w-full bg-gray-200 h-1 rounded mt-3">
            <div
              className="bg-expense h-full"
              style={{ width: `${(expense / income) * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-primary rounded-xl flex flex-col items-center justify-center text-white cursor-pointer hover:bg-primary-container">
        <div className="text-3xl">+</div>
        <p className="text-sm font-bold">Add Transaction</p>
      </div>

    </div>
  )
}
// src/modules/dashboard/RecentList.tsx
export default function RecentList({ transactions }: any) {
  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <h3 className="font-bold">Recent</h3>
      </div>

      {transactions.slice(0, 5).map((t: any) => (
        <div
          key={t.id}
          className="bg-surface-low p-4 rounded-xl flex justify-between"
        >
          <div>
            <p className="font-medium">{t.category}</p>
            <p className="text-xs text-gray-500">{t.note}</p>
          </div>

          <div
            className={
              t.type === 'expense'
                ? 'text-expense font-bold'
                : 'text-income font-bold'
            }
          >
            ฿ {t.amount}
          </div>
        </div>
      ))}

    </div>
  )
}
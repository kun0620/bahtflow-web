// src/modules/dashboard/BalanceHeader.tsx
export default function BalanceHeader({ balance }: any) {
  const balanceNum = Math.floor(balance)
  const decimals = Math.round((balance - balanceNum) * 100)

  return (
    <div className="bg-surface-container-highest rounded-[2rem] p-12 relative overflow-hidden">

      {/* Gradient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary opacity-5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary opacity-3 rounded-full -mb-32 blur-3xl" />

      <div className="relative z-10">

        <p className="text-xs uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-4">
          Current Liquidity
        </p>

        <div className="flex items-baseline gap-2">
          <h1 className="text-7xl font-extrabold text-on-surface font-headline tabular-nums tracking-tight">
            ฿{balanceNum.toLocaleString()}
          </h1>
          <span className="text-3xl text-on-surface-variant font-light">
            .{decimals.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-secondary-container text-secondary-container px-4 py-2 rounded-full text-xs font-bold">
            <span>📈</span>
            +12% vs last month
          </span>
        </div>

      </div>
    </div>
  )
}
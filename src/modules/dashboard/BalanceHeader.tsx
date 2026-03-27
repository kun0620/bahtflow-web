// src/modules/dashboard/BalanceHeader.tsx
export default function BalanceHeader({ balance }: any) {
  return (
    <div className="bg-surface-container-highest rounded-[2rem] p-10 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-20 -mt-20" />

      <div className="relative z-10">

        <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
          Current Liquidity
        </p>

        <h1 className="text-6xl font-extrabold tracking-tight tabular-nums">
          ฿ {balance.toLocaleString('th-TH')}
          <span className="text-2xl ml-2 text-primary-container">
            .00
          </span>
        </h1>

        <div className="mt-6">
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
            +12% vs last month
          </span>
        </div>

      </div>
    </div>
  )
}
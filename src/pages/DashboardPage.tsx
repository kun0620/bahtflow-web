// src/pages/DashboardPage.tsx
import { useTransactions } from '@/modules/expense/useTransactions'
import BalanceHeader from '@/modules/dashboard/BalanceHeader'
import SummaryCards from '@/modules/dashboard/SummaryCards'
import RecentList from '@/modules/dashboard/RecentList'
import ChartSection from '@/modules/dashboard/ChartSection'
import CategoryBreakdown from '@/modules/dashboard/CategoryBreakdown'

export function DashboardPage() {
  const { transactions, summary, loading } = useTransactions()

  if (loading) {
    return <div className="p-6 text-center text-on-surface-variant">Loading...</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <BalanceHeader balance={summary.balance} />

      {/* Summary Cards */}
      <SummaryCards income={summary.income} expense={summary.expense} />

      {/* Grid: Chart + Recent List + Category Breakdown */}
      <div className="grid grid-cols-12 gap-6">
        {/* Chart Section - spans 8 cols on desktop, full width on mobile */}
        <div className="col-span-12 lg:col-span-8">
          <ChartSection />
        </div>

        {/* Category Breakdown - spans 4 cols on desktop, full width on mobile */}
        <div className="col-span-12 lg:col-span-4">
          <CategoryBreakdown />
        </div>
      </div>

      {/* Recent Transactions List */}
      <RecentList transactions={transactions} />
    </div>
  )
}

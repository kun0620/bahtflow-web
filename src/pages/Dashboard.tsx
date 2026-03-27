// src/pages/Dashboard.tsx
import { useTransactions } from '@/modules/expense/useTransactions'

import MainLayout from '@/layout/MainLayout'

import BalanceHeader from '@/modules/dashboard/BalanceHeader'
import SummaryCards from '@/modules/dashboard/SummaryCards'
import ChartSection from '@/modules/dashboard/ChartSection'
import RecentList from '@/modules/dashboard/RecentList'

export default function Dashboard() {
  const { summary, transactions, loading } = useTransactions()

  if (loading) return <div className="p-10">Loading...</div>

  return (
    <MainLayout>
      <div className="space-y-10">

        {/* Hero */}
        <BalanceHeader balance={summary.balance} />

        {/* Summary */}
        <SummaryCards
          income={summary.income}
          expense={summary.expense}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-8">

          {/* Chart */}
          <div className="col-span-8">
            <ChartSection />
          </div>

          {/* Recent */}
          <div className="col-span-4">
            <RecentList transactions={transactions} />
          </div>

        </div>

      </div>
    </MainLayout>
  )
}
// src/modules/expense/expense.service.ts
export function calculateSummary(transactions: any[]) {
  let income = 0
  let expense = 0

  for (const t of transactions) {
    if (t.type === 'income') income += Number(t.amount)
    else expense += Number(t.amount)
  }

  return {
    income,
    expense,
    balance: income - expense,
  }
}
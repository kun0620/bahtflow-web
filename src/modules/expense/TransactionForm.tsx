// src/modules/expense/TransactionForm.tsx
import { useState } from 'react'
import { addTransaction } from './expense.api'

export default function TransactionForm() {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = async () => {
    if (!amount) return alert('Enter amount')

    await addTransaction({
      amount: Number(amount),
      type,
      category,
      note,
    })

    alert('Saved!')
  }

  return (
    <div className="p-4 space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="฿ Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        value={type}
        onChange={e => setType(e.target.value as any)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        className="border p-2 w-full"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Note"
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white w-full p-2"
      >
        Save
      </button>
    </div>
  )
}
import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'
import { ExpenseItem } from './ExpenseItem'

export function ExpenseList() {
  const { expenses } = useContext(ExpenseContext)

  if (!expenses.length) {
    return <p className="expense-empty">No expenses yet.</p>
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  )
}

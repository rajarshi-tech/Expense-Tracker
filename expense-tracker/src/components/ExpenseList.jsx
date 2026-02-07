import { useContext } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'
import { ExpenseItem } from './ExpenseItem'
import './ExpenseList.css'

export function ExpenseList() {
  const { expenses } = useContext(ExpenseContext)

  if (!expenses.length) {
    return <p className="expense-empty">No expenses yet.</p>
  }

  return (
    <>
      <div className="expense-list">
        <div className="expense-header">
          <div className="item-category">Category</div>
          <div className="item-details">Details</div>
          <div className="item-date">Date</div>
          <div className="item-cost cost-title">Cost</div>
        </div>
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </>
  )
}

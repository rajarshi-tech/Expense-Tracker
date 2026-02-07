import { useContext } from 'react'
import DeleteButton from '../assets/delete-button.png'
import { ExpenseContext } from '../context/ExpenseContext'

import './ExpenseItem.css'

export function ExpenseItem({ expense }) {
  const { deleteExpense } = useContext(ExpenseContext)

  return (
    <div className="expense-item">
      <div className="item-category">{expense.category}</div>
      <div className="item-details">{expense.details}</div>
      <div className="item-date">{expense.date}</div>
      <div className="item-cost">
        {expense.cost.toFixed(2)}
        <img
          src={DeleteButton}
          className="delete-button"
          onClick={() => deleteExpense(expense.id)}
        />
      </div>
    </div>
  )
}

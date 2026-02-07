import './ExpenseItem.css'

export function ExpenseItem({ expense }) {

  return (
    <div className="expense-item">
      <div className="item-category">{expense.category}</div>
      <div className="item-details">{expense.details}</div>
      <div className="item-date">{expense.date}</div>
      <div className="item-cost">{expense.cost.toFixed(2)}</div>
    </div>
  )
}

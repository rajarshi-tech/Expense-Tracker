export function ExpenseItem({ expense }) {

  return (
    <div className="expense-item">
      <div className="expense-item-top">
        <h3>{expense.category}</h3>
        <span className="expense-item-cost">${expense.cost.toFixed(2)}</span>
      </div>
      <p className="expense-item-details">{expense.details}</p>
      <time className="expense-item-date">{expense.date}</time>
    </div>
  )
}

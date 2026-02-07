import { useContext, useState } from 'react'
import DeleteButton from '../assets/delete-button.png'
import EditButton from '../assets/edit.png'
import { ExpenseContext } from '../context/ExpenseContext'

import './ExpenseItem.css'

export function ExpenseItem({ expense }) {
  const { deleteExpense, editExpense } = useContext(ExpenseContext)
  const [isEditing, setIsEditing] = useState(false)
  const [category, setCategory] = useState('')
  const [details, setDetails] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')

  const openEditor = () => {
    setCategory(expense.category)
    setDetails(expense.details)
    setCost(String(expense.cost))
    setDate(expense.date)
    setIsEditing(true)
  }

  const closeEditor = () => {
    setIsEditing(false)
  }

  const handleSave = () => {
    const trimmedCategory = category.trim()
    const trimmedDetails = details.trim()
    const parsedCost = Number.parseFloat(cost)

    if (!trimmedCategory || !trimmedDetails || !date || Number.isNaN(parsedCost)) {
      return
    }

    editExpense(expense.id, {
      category: trimmedCategory,
      details: trimmedDetails,
      cost: parsedCost,
      date,
    })
    closeEditor()
  }

  return (
    <>
      <div className="expense-item">
        <div className="item-category">{expense.category}</div>
        <div className="item-details">{expense.details}</div>
        <div className="item-date">{expense.date}</div>
        <div className="item-cost">
          {expense.cost.toFixed(2)}
          <span className='gap'></span>
          <img src={EditButton} className="action-button" onClick={openEditor} />
          <img
            src={DeleteButton}
            className="action-button"
            onClick={() => deleteExpense(expense.id)}
          />
        </div>
      </div>

      {isEditing && (
        <div className="modal-backdrop" onClick={closeEditor}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">Edit Expense</div>
            <div className="modal-body">
              <input
                className="modal-input"
                placeholder="Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
              <textarea
                className="modal-input modal-textarea"
                placeholder="Details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
              />
              <div className="modal-row">
                <input
                  className="modal-input"
                  placeholder="Cost"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                />
                <input
                  className="modal-input"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-button" type="button" onClick={closeEditor}>
                Cancel
              </button>
              <button className="modal-button" type="button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

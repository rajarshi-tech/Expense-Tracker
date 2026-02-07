import { useContext, useState } from 'react'
import { ExpenseContext } from '../context/ExpenseContext'
import './ExpenseForm.css'

export function ExpenseForm() {
  const { addExpense } = useContext(ExpenseContext)
  const [category, setCategory] = useState('')
  const [details, setDetails] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedCategory = category.trim()
    const trimmedDetails = details.trim()
    const parsedCost = Number.parseFloat(cost)

    if (!trimmedCategory || !trimmedDetails || !date || Number.isNaN(parsedCost)) {
      return
    }

    addExpense({
      cost: parsedCost,
      category: trimmedCategory,
      details: trimmedDetails,
      date,
    })

    setCategory('')
    setDetails('')
    setCost('')
    setDate('')
  }

  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="top">
          <input
            className="category-input"
            placeholder="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button type="submit">Add</button>
        </div>

        <div className="bottom">
          <div className="bottom-left">
            <textarea
              className="details-input"
              placeholder="Details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />
          </div>

          <div className="bottom-right">
            <input
              className="cost-input"
              placeholder="cost"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  )
}

import { createContext, useMemo, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
})

const initialExpenses = [
  {
    id: 'exp-1',
    cost: 18.5,
    category: 'Groceries',
    details: 'Fruit, milk, and bread',
    date: '2026-02-05',
  },
  {
    id: 'exp-2',
    cost: 42.0,
    category: 'Transport',
    details: 'Gas refill',
    date: '2026-02-06',
  },
]

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(initialExpenses)

  const addExpense = (expenseInput) => {
    setExpenses((prev) => [
      {
        id: `exp-${Date.now()}`,
        cost: expenseInput.cost,
        category: expenseInput.category.trim(),
        details: expenseInput.details.trim(),
        date: expenseInput.date,
      },
      ...prev,
    ])
  }

  const value = useMemo(() => ({ expenses, addExpense }), [expenses])

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

import { createContext, useEffect, useState } from 'react'

//key = expenses

// eslint-disable-next-line react-refresh/only-export-components
export const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  editExpense: () => {}
})

/*
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
*/

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem('expenses');;
    return (stored) ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expenseInput) => {
    setExpenses((prev) => [
      {
        id: crypto.randomUUID(),
        cost: expenseInput.cost,
        category: expenseInput.category.trim(),
        details: expenseInput.details.trim(),
        date: expenseInput.date,
      },
      ...prev,
    ])
  };

  const deleteExpense = (expenseId) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId))
  };

  const editExpense = (expenseId, updatedExpense) => {
    setExpenses(prev =>
      prev.map(expense =>
        expense.id === expenseId
          ? { ...expense, ...updatedExpense }
          : expense
      )
    );
  };

  const deleteTotal = () => {
    setExpenses([]);
    localStorage.clear();
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense, deleteTotal }}>
      {children}
    </ExpenseContext.Provider>
  )
}

import { createContext, useEffect, useMemo, useState } from 'react'
import { firestore } from '../firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'

// eslint-disable-next-line react-refresh/only-export-components
export const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  editExpense: () => {},
  deleteTotal: () => {},
})

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([])
  const expensesCollection = useMemo(
    () => collection(firestore, 'expenses'),
    []
  )

  useEffect(() => {
    const q = query(expensesCollection, orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const next = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }))
        setExpenses(next)
      },
      (error) => {
        console.error('Failed to load expenses from Firestore:', error)
      }
    )

    return () => unsubscribe()
  }, [expensesCollection])

  const addExpense = async (expenseInput) => {
    await addDoc(expensesCollection, {
      cost: Number(expenseInput.cost),
      category: expenseInput.category.trim(),
      details: expenseInput.details.trim(),
      date: expenseInput.date,
      createdAt: serverTimestamp(),
    })
  }

  const deleteExpense = async (expenseId) => {
    await deleteDoc(doc(firestore, 'expenses', expenseId))
  }

  const editExpense = async (expenseId, updatedExpense) => {
    const updatePayload = { ...updatedExpense }

    if (Object.prototype.hasOwnProperty.call(updatedExpense, 'category')) {
      updatePayload.category = updatedExpense.category?.trim?.()
    }

    if (Object.prototype.hasOwnProperty.call(updatedExpense, 'details')) {
      updatePayload.details = updatedExpense.details?.trim?.()
    }

    if (Object.prototype.hasOwnProperty.call(updatedExpense, 'cost')) {
      updatePayload.cost = Number(updatedExpense.cost)
    }

    Object.keys(updatePayload).forEach((key) => {
      if (updatePayload[key] === undefined) {
        delete updatePayload[key]
      }
    })

    await updateDoc(doc(firestore, 'expenses', expenseId), updatePayload)
  }

  const deleteTotal = async () => {
    const snapshot = await getDocs(expensesCollection)
    const batch = writeBatch(firestore)
    snapshot.forEach((docSnapshot) => {
      batch.delete(docSnapshot.ref)
    })
    await batch.commit()
    setExpenses([])
  }

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, editExpense, deleteTotal }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}

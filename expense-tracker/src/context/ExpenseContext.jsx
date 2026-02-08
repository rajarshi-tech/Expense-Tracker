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
import { useAuth } from './AuthContext'

// eslint-disable-next-line react-refresh/only-export-components
export const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  editExpense: () => {},
  deleteTotal: () => {},
})

export function ExpenseProvider({ children }) {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])
  const expensesCollection = useMemo(() => {
    if (!user) return null
    return collection(firestore, 'users', user.uid, 'expenses')
  }, [user])

  useEffect(() => {
    if (!expensesCollection) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpenses([])
      return undefined
    }

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
    if (!expensesCollection) return
    await addDoc(expensesCollection, {
      cost: Number(expenseInput.cost),
      category: expenseInput.category.trim(),
      details: expenseInput.details.trim(),
      date: expenseInput.date,
      createdAt: serverTimestamp(),
    })
  }

  const deleteExpense = async (expenseId) => {
    if (!user) return
    await deleteDoc(doc(firestore, 'users', user.uid, 'expenses', expenseId))
  }

  const editExpense = async (expenseId, updatedExpense) => {
    if (!user) return
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

    await updateDoc(
      doc(firestore, 'users', user.uid, 'expenses', expenseId),
      updatePayload
    )
  }

  const deleteTotal = async () => {
    if (!expensesCollection) return
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

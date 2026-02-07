import { ExpenseProvider } from "../context/ExpenseContext"
import { Header } from "../components/Header"
import { ExpenseForm } from "../components/ExpenseForm"
import { ExpenseList } from "../components/ExpenseList"

export function HomePage() {
  return (
    <>
      <title>Dashboard</title>
      <Header />
      <ExpenseForm />
      <ExpenseList />
    </>
  )
}
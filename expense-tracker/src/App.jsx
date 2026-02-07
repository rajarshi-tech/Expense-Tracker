import { Header } from './components/Header'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseList } from './components/ExpenseList'
import { ExpenseProvider } from './context/ExpenseContext'

import './App.css'

function App() {
  return (
    <>
      <ExpenseProvider>
        <Header />
        <ExpenseForm />
        <ExpenseList />
      </ExpenseProvider>
    </>
  )
}

export default App

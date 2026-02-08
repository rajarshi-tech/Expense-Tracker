import { HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { Charts } from './pages/Charts'

import './App.css'
import { ExpenseProvider } from './context/ExpenseContext'
import { Login } from './pages/Login'

function App() {
  return (
    <ExpenseProvider>  
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="charts" element={<Charts />} />
        <Route path="sign-in" element={<Login />} />
      </Routes>
    </ExpenseProvider>
  )
}

export default App

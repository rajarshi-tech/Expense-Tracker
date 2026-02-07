import { HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { Charts } from './pages/Charts'

import './App.css'
import { ExpenseProvider } from './context/ExpenseContext'

function App() {
  return (
    <ExpenseProvider>  
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="charts" element={<Charts />} />
      </Routes>
    </ExpenseProvider>
  )
}

export default App

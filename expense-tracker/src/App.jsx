import { HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { Charts } from './pages/Charts'

import './App.css'
import { ExpenseProvider } from './context/ExpenseContext'
import { Login } from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="charts"
            element={
              <ProtectedRoute>
                <Charts />
              </ProtectedRoute>
            }
          />
          <Route path="sign-in" element={<Login />} />
        </Routes>
      </ExpenseProvider>
    </AuthProvider>
  )
}

export default App

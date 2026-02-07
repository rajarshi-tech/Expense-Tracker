import { HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import { Charts } from './pages/Charts'

import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="charts" element={<Charts />} />
    </Routes>
  )
}

export default App

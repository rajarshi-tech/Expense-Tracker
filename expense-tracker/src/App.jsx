import { HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="charts" element={<p>test</p>} />
    </Routes>
  )
}

export default App

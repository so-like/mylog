import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import CarPage from './pages/carPage'
import Student from './pages/student'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/car" element={<CarPage />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

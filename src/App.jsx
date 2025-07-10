// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PresupuestosList from './pages/PresupuestosList'
import PresupuestoForm from './pages/PresupuestoForm'
import PresupuestoDetalle from './pages/PresupuestoDetalle' // 👈 Asegurate de tener este archivo
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/presupuestos"
        element={
          <ProtectedRoute>
            <PresupuestosList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/presupuestos/nuevo"
        element={
          <ProtectedRoute>
            <PresupuestoForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/presupuestos/editar/:id"
        element={
          <ProtectedRoute>
            <PresupuestoForm />
          </ProtectedRoute>
        }
      />

      {/* 💡 Esta ruta es clave para el QR */}
      <Route
        path="/presupuestos/detalle/:id"
        element={
          <ProtectedRoute>
            <PresupuestoDetalle />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App

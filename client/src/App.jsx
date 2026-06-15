import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ProtectedRoute from './routes/ProtectedRoutes'
import Dashboard from './pages/dashboard/Dashboard'
import Transactions from './pages/transactions/Transactions'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Debts from './pages/debts/Debts'
import AddTransaction from './pages/transactions/AddTransaction'
import EditTransaction from './pages/transactions/EditTransaction'
import AddDebt from './pages/debts/AddDebt'
import AddPayment from './pages/debts/AddPayment'
import DebtPayments from './pages/debts/DebtPayments'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/debts"
        element={
          <ProtectedRoute>
            <Debts />
          </ProtectedRoute>
        }
      />

      <Route
  path="/debts/add"
  element={
    <ProtectedRoute>
      <AddDebt />
    </ProtectedRoute>
  }
/>

<Route
  path="/debts/:id/payment"
  element={
    <ProtectedRoute>
      <AddPayment />
    </ProtectedRoute>
  }
/>

<Route
  path="/debts/:id/payments"DebtPayments
  element={
    <ProtectedRoute>
      <DebtPayments />
    </ProtectedRoute>
  }
/>
      <Route
  path="/transactions/add"
  element={
    <ProtectedRoute>
      <AddTransaction />
    </ProtectedRoute>
  }
/>
<Route
  path="/transactions/edit/:id"
  element={
    <ProtectedRoute>
      <EditTransaction />
    </ProtectedRoute>
  }
/>
      </Routes>
    </div>
  )
}

export default App

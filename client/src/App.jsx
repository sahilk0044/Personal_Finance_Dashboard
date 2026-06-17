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
import Budgets from './pages/budgets/Budgets'
import AddBudget from './pages/budgets/AddBudget'
import EditBudget from './pages/budgets/EditBudget'
import Alerts from './pages/alerts/Alerts'
import Reports from './pages/reports/Reports'
import Profile from './pages/auth/Profile'
import LandingPage from './pages/landing/LandingPage'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>

        <Route
  path="/"
  element={<LandingPage />}
/>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
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

<Route
  path="/budgets"
  element={<Budgets />}
/>

<Route
  path="/budgets/add"
  element={<AddBudget />}
/>
<Route
  path="/budgets/edit/:id"
  element={<EditBudget />}
/>

<Route
  path="/alerts"
  element={<Alerts />}
/>
<Route
  path="/reports"
  element={<Reports />}
/>
<Route
  path="/profile"
  element={<Profile />}
/>
      </Routes>
    </div>
  )
}

export default App

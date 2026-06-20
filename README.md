# 💰 Finora - Personal Finance Management System

A full-stack MERN application that helps users manage their personal finances through expense tracking, income management, budgeting, debt monitoring, analytics, financial health insights, and downloadable reports.

Built with modern web technologies and designed to provide users with a complete financial management experience rather than a simple expense tracker. 

---
Live Demo: https://finora-personal-finance-dashboard-six.vercel.app/
## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login
* JWT Authentication
* Protected Routes
* Password Encryption using bcrypt
* Role-Based Access Control (User/Admin)

### 💵 Transaction Management

* Add Income & Expense Records
* Edit and Delete Transactions
* Categorized Transactions
* Payment Method Tracking
* Transaction History
* Search & Filter Transactions

### 📊 Dashboard Analytics

* Income vs Expense Overview
* Monthly Financial Trends
* Category-wise Expense Analysis
* Financial Summary Cards
* Recent Transaction Activity

### 🎯 Budget Management

* Create Monthly Budgets
* Category-wise Budget Allocation
* Budget Usage Tracking
* Budget Performance Analytics
* Overspending Detection

### 🤝 Debt Management

* Track Borrowed Money
* Track Lent Money
* Record Debt Payments
* Remaining Balance Calculation
* Debt Status Monitoring

### 🏥 Financial Health Score

* Savings Analysis
* Budget Adherence Evaluation
* Spending Pattern Analysis
* Overall Financial Score Calculation

### 📄 Reports & Export

* Generate Financial Reports
* Export Reports as PDF
* Income & Expense Summaries
* Budget Performance Reports

### 👨‍💼 Admin Panel

* Admin Dashboard
* User Statistics
* Financial Insights
* Alert Management

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap
* React Icons
* Framer Motion
* Recharts
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---
```
## 📂 Project Structure

Personal_Finance_Dashboard/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── context/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── services/
│
└── README.md
```

---

## 📈 Key Modules

| Module         | Description                          |
| -------------- | ------------------------------------ |
| Authentication | Secure login and registration system |
| Transactions   | Manage income and expenses           |
| Budgets        | Create and monitor monthly budgets   |
| Debts          | Track borrowed and lent money        |
| Analytics      | Financial insights and trends        |
| Reports        | Generate downloadable PDF reports    |

---

## 📸 Screens Included

* Landing Page
* Login & Register
* User Dashboard
* Income Management
* Expense Management
* Budget Management
* Debt Management
* Analytics Dashboard
* Alerts Center
* User Profile

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/sahilk0044/Personal_Finance_Dashboard.git
cd Personal_Finance_Dashboard
```

### Backend Setup

```bash
cd server

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

Run Backend

```bash
npm start
```

### Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Server

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

### Client

```env
VITE_API_URL=
```

---

## 🎯 Learning Outcomes

This project demonstrates:

* Full Stack MERN Development
* REST API Design
* JWT Authentication
* MongoDB Data Modeling
* State Management
* Data Visualization
* Financial Analytics
* Role-Based Authorization
* PDF Report Generation
* Deployment & Production Configuration

---
```
### Connect

* GitHub: https://github.com/sahilk0044
* LinkedIn: https://linkedin.com/in/sahil-kolekar0055

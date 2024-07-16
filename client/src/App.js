import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ExpenseTracker from './ExpenseTracker';
import AddIncome from './AddIncome';
import ViewIncome from './ViewIncome';
import AddExpense from './AddExpense';
import ViewExpense from './viewExpense';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
        <Route path="/add-income" element={<AddIncome />} />
        <Route path="/view-income" element={<ViewIncome />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/view-expense" element={<ViewExpense />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseChart from './ExpenseChart'; // Import ExpenseChart component
import './index.css';

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingsObjective, setSavingsObjective] = useState(0);
  const [expensesObjective, setExpensesObjective] = useState(0);
  const [currentSavingsObjective, setCurrentSavingsObjective] = useState(0);
  const [currentExpensesObjective, setCurrentExpensesObjective] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/total-income', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setTotalIncome(Number(data.total)))
      .catch((error) => console.error('Error fetching total income:', error));

    fetch('http://localhost:8080/total-expenses', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setTotalExpenses(Number(data.total)))
      .catch((error) => console.error('Error fetching total expenses:', error));

    fetch('http://localhost:8080/get-objective', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentSavingsObjective(data.savingsObjective);
        setCurrentExpensesObjective(data.expensesObjective);
      })
      .catch((error) => console.error('Error fetching objectives:', error));
  }, []);

  useEffect(() => {
    setBalance(totalIncome - totalExpenses);
  }, [totalIncome, totalExpenses]);

  const handleResetBalance = () => {
    fetch('http://localhost:8080/reset-balance', {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then(() => {
        setTotalIncome(0);
        setTotalExpenses(0);
        setBalance(0);
      })
      .catch((error) => console.error('Error resetting balance:', error));
  };

  const handleLogout = () => {
    fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          navigate('/login');
        } else {
          console.error('Logout failed');
        }
      })
      .catch((error) => console.error('Error logging out:', error));
  };

  const handleSetObjectives = () => {
    fetch('http://localhost:8080/set-objective', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savingsObjective, expensesObjective }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentSavingsObjective(savingsObjective);
        setCurrentExpensesObjective(expensesObjective);
        setSavingsObjective(0);
        setExpensesObjective(0);
        console.log('Objectives set:', data);
      })
      .catch((error) => console.error('Error setting objectives:', error));
  };

  return (
    <div className="container">
      <div className="logout-container">
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
      <h1>Expense Tracker</h1>
      <div className="expense-cards">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Current Balance</h2>
            <p className="card-text">{balance.toFixed(2)}</p>
            <div className="card-footer">
              <button className="button" onClick={handleResetBalance}>Reset Balance</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Total Income</h2>
            <p className="card-text">{totalIncome.toFixed(2)}</p>
            <div className="card-footer">
              <button className="button" onClick={() => navigate('/add-income')}>Add Income</button>
              <button className="button" onClick={() => navigate('/view-income')}>View Incomes</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Total Expenses</h2>
            <p className="card-text">{totalExpenses.toFixed(2)}</p>
            <div className="card-footer">
              <button className="button" onClick={() => navigate('/add-expense')}>Add Expense</button>
              <button className="button" onClick={() => navigate('/view-expense')}>View Expenses</button>
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <ExpenseChart />
      </div>
      <div className="objectives-container">
        <h2>Set Objectives</h2>
        <div className="objective-field">
          <label>Savings Objective:</label>
          <input
            type="number"
            value={savingsObjective}
            onChange={(e) => setSavingsObjective(Number(e.target.value))}
          />
          <span>Current: {currentSavingsObjective}</span>
        </div>
        <div className="objective-field">
          <label>Expenses Objective:</label>
          <input
            type="number"
            value={expensesObjective}
            onChange={(e) => setExpensesObjective(Number(e.target.value))}
          />
          <span>Current: {currentExpensesObjective}</span>
        </div>
        <button className="button" onClick={handleSetObjectives}>Set Objectives</button>
      </div>
    </div>
  );
};

export default ExpenseTracker;

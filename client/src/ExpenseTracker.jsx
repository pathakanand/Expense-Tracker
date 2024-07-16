import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
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
    </div>
  );
};

export default ExpenseTracker;

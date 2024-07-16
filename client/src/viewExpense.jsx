import React, { useState, useEffect } from 'react';

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/expenses', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <div>
      <h2>View Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: Rs {expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewExpense;

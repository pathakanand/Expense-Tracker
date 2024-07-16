import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const navigate=useNavigate();

  const handleAddExpense = () => {
    fetch('http://localhost:8080/expenses', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount: parseFloat(amount) }),
    })
      .then((res) => res.json())
      .then(() => {
        setDescription('');
        setAmount('');
        navigate('/expenses');
      })
      .catch((error) => console.error('Error adding expense:', error));
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default AddExpense;

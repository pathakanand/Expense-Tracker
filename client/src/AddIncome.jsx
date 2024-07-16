import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddIncome = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const navigate=useNavigate();


  const handleAddIncome = () => {
    fetch('http://localhost:8080/income', {
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
      .catch((error) => console.error('Error adding income:', error));
  };

  return (
    <div>
      <h2>Add Income</h2>
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
      <button onClick={handleAddIncome}>Add Income</button>
    </div>
  );
};

export default AddIncome;

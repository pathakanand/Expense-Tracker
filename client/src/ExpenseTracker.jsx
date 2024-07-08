import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/expenses', {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTransactions(data);
          const totalBalance = data.reduce((acc, transaction) => acc + transaction.amount, 0);
          setBalance(totalBalance);
        } else {
          console.error('Expected an array of transactions, received:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const addExpense = () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const newExpense = { description, amount: parsedAmount };

    fetch('http://localhost:8080/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(newExpense),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions([...transactions, data]);
        setBalance(balance + parsedAmount);
      })
      .catch((error) => console.error('Error adding expense:', error));

    setDescription('');
    setAmount('');
  };

  const handleLogout=()=>{
    fetch('http://localhost:8080/api/logout',{
      method:'POST',
      credentials:'include'
    })
      .then(response =>{
        if(response.ok) {
          navigate('/login');
        }else{
          throw new Error('Logout Failed');
        }
      })
      .catch(error => console.log("Error during logout:",error));
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className="balance">
        <h2>
          Balance: Rs
          <span id="balance">
            {balance.toFixed(2)}
          </span>
        </h2>
      </div>
      <div className="transactions">
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {`${transaction.description}: Rs${(transaction.amount || 0).toFixed(2)}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-expense">
        <h2>Add Expense</h2>
        <form>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="button" onClick={addExpense}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseTracker;

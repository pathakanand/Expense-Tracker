import React, { useState, useEffect } from 'react';

const ViewIncome = () => {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/total-income', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.incomes)) {
          setIncomes(data.incomes);
        } else {
          console.error('Unexpected response format for incomes:', data);
        }
      })
      .catch((error) => console.error('Error fetching incomes:', error));
  }, []);

  return (
    <div>
      <h2>View Incomes</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income._id}>
            {income.description}: Rs {income.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewIncome;

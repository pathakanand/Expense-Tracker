import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ExpenseChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/total-expenses', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const expenses = data.expenses || [];
        const labels = expenses.map(expense => expense.description);
        const amounts = expenses.map(expense => expense.amount);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Expenses',
              data: amounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <div>
      <h2>Expense Chart</h2>
      {chartData.labels && chartData.datasets ? (
        <Bar data={chartData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExpenseChart;

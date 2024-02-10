import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

const MetricsPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [netSaleData, setNetSaleData] = useState([]);
  const [netExpenseData, setNetExpenseData] = useState([]);
  const [targetRemainingData, setTargetRemainingData] = useState([]);

  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://127.0.0.1:8000//metrics/?city=${selectedCity}`)
        .then(response => {
          const data = response.data.data;
          setNetSaleData(data.map(entry => entry.netSale));
          setNetExpenseData(data.map(entry => entry.netExpense));
          setTargetRemainingData(data.map(entry => entry.dailyTarget - entry.netSale));
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedCity]);

  const netSaleChart = {
    labels: Array.from({ length: netSaleData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Net Sale',
        data: netSaleData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const netExpenseChart = {
    labels: Array.from({ length: netExpenseData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Net Expense',
        data: netExpenseData,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  const targetRemainingChart = {
    labels: Array.from({ length: targetRemainingData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Target Remaining',
        data: targetRemainingData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <label>Select City: </label>
      <select onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="Agra">Agra</option>
        <option value="Delhi">Delhi</option>
        <option value="Banglore">Banglore</option>
        <option value="Bombay">Bombay</option>
        <option value="Goa">Goa</option>
        <option value="Jaipur">Jaipur</option>
      </select>
      <div>
        {/* Render Line Graph for Net Sale */}
        <Line data={netSaleChart} />
      </div>

      <div>
        {/* Render Bar Graph for Net Expense */}
        <Bar data={netExpenseChart} />
      </div>

      <div>
        {/* Render Doughnut Chart for Target Remaining */}
        <Doughnut data={targetRemainingChart} />
      </div>
      
    </div>
  );
};

export default MetricsPage;

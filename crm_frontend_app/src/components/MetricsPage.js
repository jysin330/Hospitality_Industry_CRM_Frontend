import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MetricsPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  
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

      
    </div>
  );
};

export default MetricsPage;

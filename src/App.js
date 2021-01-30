import React, { useState, useEffect } from 'react';
import ExpensiveOrder from './ExpensiveOrder/ExpensiveOrder';
import MostCustomerOrders from './MostCustomerOrders/MostCustomerOrders';
import TotalOrdersByYears from './TotalOrdersByYear/TotalOrdersByYear';
import { fetchData } from './services/dataService';
import './App.css';
import logo from './img/research-square-logo.svg';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
      fetchData()
      .then(({ data }) => {
        setOrders(data.orders);
        setCustomers(data.customers);
        setIsLoaded(true);
      })
      .catch(error => alert(error))
  }, []);

  if(!isLoaded) {
    return <div>Spinner!</div>;
  }

  return (
    <div className="App">
        <img class="logo" src={logo} />
        <hr/>
        <ExpensiveOrder orders={orders} />
        <MostCustomerOrders orders={orders} customers={customers}/>
        <TotalOrdersByYears orders={orders} />
    </div>
  );
}

export default App;

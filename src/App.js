import React, { useState, useEffect } from 'react'
import ExpensiveOrder from './ExpensiveOrder/ExpensiveOrder'
import MostCustomerOrders from './MostCustomerOrders/MostCustomerOrders'
import TotalOrdersByYears from './TotalOrdersByYear/TotalOrdersByYear'
import axios from 'axios'
import { fetchData } from './services/dataService'
import './App.css';
import logo from './img/research-square-logo.svg'

function App() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("/2020/orders-2020-02-10.json")
      // fetchData()
      .then(({ data }) => {
        setOrders(data.orders);
        setCustomers(data.customers);
      })
      .catch(error => alert(error))
  }, [])

  return (
    <div className="App">
      <h1><img src={logo} /></h1>
        <hr/>
        <>
        <ExpensiveOrder orders={orders} />
        <MostCustomerOrders orders={orders} customers={customers}/>
        <TotalOrdersByYears orders={orders} />
        </>
    </div>
  );
}

export default App;

import React, { useState } from 'react'
import ExpensiveOrderRow from './ExpensiveOrderRow/ExpensiveOrderRow'
import MostCustomerOrdersRow from './MostCustomerOrdersRow/MostCustomerOrdersRow'
import axios from 'axios'
import { fetchData } from './services/dataService'
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showData, setShowData] = useState(false);

  const fetchApiData = () => {
    axios.get("/2020/orders-2020-02-10.json")
      // fetchData()
      .then(({ data }) => {
        setData(data.orders);
        setCustomers(data.customers);
      })
      .then(setShowData(true));
  }


  const totalPrices = data.map((customer) => {
    return parseInt(customer.total_price);
  }
  )

  const maxTotalPrice = Math.max(...totalPrices);

  // as time allows
  // 0. service(s), no logic in App.js, separate data vs. presentational components
  // 1. TypeScript
  // 2. Linting


  function printTotalPriceOfOrders () {
    const sumByYear = data.reduce((accumulator, order) => {
      const orderYear = new Date(order.created_date).getFullYear();
      if (accumulator.has(orderYear)) {
        const currentSumByYear = accumulator.get(orderYear);
        accumulator.set(orderYear, currentSumByYear + order.total_price);
      } else {
        accumulator.set(orderYear, order.total_price)
      }
      return accumulator;
    }, new Map());
    return sumByYear;
  }

  const totalPriceOfOrders = printTotalPriceOfOrders()

  
    const arrayOfTotalsByYear = Array.from(totalPriceOfOrders, ([year, total]) => ({ year, total }));

    const mappedTotalsByYear = arrayOfTotalsByYear.map((year) => (
      <li>{year.year} - ${year.total}</li>
    ))

  //  3. Find the maxCustomer by finding the order whose `total_price` matches `maxTotalPrice`
  const maxOrder = data.filter(order => order.total_price === maxTotalPrice)

  //  Then grab that `customer_id` and find the `customer` who matches that and return their `name`
  function findMaxOrderCustomerId(maxOrder) {
    if (maxOrder) {
      return maxOrder.customer_id
    }
  }
  const maxOrderCustomerId = findMaxOrderCustomerId(maxOrder[0])

  const maxCustomerName = findCustomerWithMaxOrder(maxOrderCustomerId, customers)


  function findCustomerWithMaxOrder(maxOrderId, customers) {
    if (customers.length > 0) {
      const foundCustomer = customers.find(customer => customer.id === maxOrderId);
      return foundCustomer.name;
    }
  }

  const mappedCustomers = data.map((order) => {
    return <li>{order.customer_id}</li>
  });

  return (
    <div className="App">
      <h1>Research Square</h1>
      <button onClick={fetchApiData}>Click</button>
      {showData ?
        <>
        <ExpensiveOrderRow orders={data} />
        <MostCustomerOrdersRow orders={data} customers={customers}/>
          <h2>Customer with the most orders = {maxCustomerName}</h2>
          <h2>Total Orders by Year: {mappedTotalsByYear}</h2>
        </>
        : null}
    </div>
  );
}

export default App;

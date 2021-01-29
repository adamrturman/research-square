import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showData, setShowData] = useState(false);

  const fetchData = () => {
    axios.get("/2020/orders-2020-02-10.json")
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

  //  2. calculate and print the sum of prices for all
  //   orders created in the previous three years, grouped by year.
  //  Total price of orders in 2018 = 275.00
  //   Total price of orders in 2019 = 860.00
  //   Total price of orders in 2020 =  20.00

  //  Loop through the `orders` and check the first four characters of the `created_date` property --edit: loop through years
  //  Push the `total_price` property of that order into an array for that specific year
  //  After the loop is completed, reduce those year arrays into a single sum and render in the DOM
  //  

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
    // console.log("arrayOfTotalsByYear", arrayOfTotalsByYear)

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

  console.log("Customer with max order", maxOrderCustomerId)
  console.log("Name", findCustomerWithMaxOrder(maxOrderCustomerId, customers))

  const mappedCustomers = data.map((order) => {
    return <li>{order.customer_id}</li>
  });

  return (
    <div className="App">
      <h1>Research Square</h1>
      <button onClick={fetchData}>Click</button>
      {showData ?
        <>
          <h2>Most expensive order = {maxTotalPrice}</h2>
          <h2>Customer with the most orders = {maxCustomerName}</h2>
          <h2>Total Orders by Year: {mappedTotalsByYear}</h2>
        </>
        : null}
    </div>
  );
}

export default App;

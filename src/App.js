import React, {useState} from 'react'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [customers, setCustomers] = useState([])
  const [showData, setShowData] = useState(false)

  const displayData = (event) => {
    fetch("/2020/orders-2020-02-10.json")
      .then((response) => response.json())
      .then((data) => setData(data.orders), setCustomers(data.customers))
      .then(setShowData(true))
  }

  console.log("here are customers", customers)

  const individualCustomers = data.map((customer) => {
    return customer.items.map((item) => (
      <li>{item.name} - {item.price}</li>
    ))
  })

  const totalPrices = data.map((customer) => {
      return parseInt(customer.total_price)
    }
  )

  const maxTotalPrice = Math.max(...totalPrices)

//  2. calculate and print the sum of prices for all
//   orders created in the previous three years, grouped by year.
//  Total price of orders in 2018 = 275.00
//   Total price of orders in 2019 = 860.00
//   Total price of orders in 2020 =  20.00

    //  Loop through the `orders` and check the first four characters of the `created_date` property
    //  Push the `total_price` property of that order into an array for that specific year
    //  After the loop is completed, reduce those year arrays into a single sum and render in the DOM
    //  

  //  3. Find the maxCustomer by finding the order whose `total_price` matches `maxTotalPrice`
  const maxOrder = data.filter(order => order.total_price === maxTotalPrice) 
  const maxOrderObject = maxOrder[0]
  //  Then grab that `customer_id` and find the `customer` who matches that and return their `name`
  function findMaxOrderId (maxOrder) {
    if(maxOrderObject) {
      return maxOrderObject.customer_id
    }
  }
  const maxOrderId = findMaxOrderId(maxOrderObject)

  function findCustomerWithMaxOrder (maxOrderId, customers) {
    console.log("customers in foundCustomer", customers)
    if (customers) {
      console.log("in foundCustomer function")
      const foundCustomer = customers.filter(customer => customer.id === maxOrderId)
      return foundCustomer.name
    }
  }

  console.log(typeof maxOrder)
  console.log("maxOrder", maxOrder)
  console.log("maxOrderObject", maxOrderObject)
  console.log("Customer with max order", maxOrderId)
  console.log("Name", findCustomerWithMaxOrder(maxOrderId, data.customers))


  // const individualCustomers = data.map((customer) => {
  //   return customer.items.filter((item) => (
  //     Math.max(item.price)))
  // })

  const mappedCustomers = data.map((order) => {
    return <li>{order.customer_id}</li>
})
 
  return (
    <div className="App">
      <h1>Research Square</h1>
      <button onClick={displayData}>Click</button>
      {showData ?
      <>
      <h2>Most expensive order = {maxTotalPrice}</h2>
      <h2>Customer with the most orders = </h2>
      <div>{mappedCustomers} - {individualCustomers}</div>
      </>
      : null}
    </div>
  );
}

export default App;

import React, {useState} from 'react'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [showData, setShowData] = useState(false)

  const displayData = (event) => {
    fetch("/2020/orders-2020-02-10.json")
      .then((response) => response.json())
      .then((data) => setData(data.orders))
      .then(setShowData(true))
  }

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
      <h2>Largest total price: {maxTotalPrice}</h2>
      <button onClick={displayData}>Click</button>
      <div>{mappedCustomers} - {individualCustomers}</div>
    </div>
  );
}

export default App;

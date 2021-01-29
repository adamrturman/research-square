import logo from './logo.svg';
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

  console.log("individualCustomers", individualCustomers)

  const mappedCustomers = data.map((order) => {
    return <li>{order.customer_id}</li>
})

  // const mappedItems = individualCustomers.map((item) => (
  //   <li>{item.name} - {item.price}</li>
  // ))

  console.log("mappedCustomers", mappedCustomers)

  // console.log("mappedItems", mappedItems)
  
  return (
    <div className="App">
      <h1>Research Square</h1>
      <button onClick={displayData}>Click</button>
      <div>{mappedCustomers} - {individualCustomers}</div>
    </div>
  );
}

export default App;

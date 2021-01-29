import React from 'react'

function MostCustomerOrdersRow(props) {

    console.log("most customer order props", props)

    

    const totalPrices = props.orders.map((customer) => {
        return parseInt(customer.total_price);
      }
      )
    
      const maxTotalPrice = Math.max(...totalPrices);

      const maxOrder = props.orders.filter(order => order.total_price === maxTotalPrice)

    //  Then grab that `customer_id` and find the `customer` who matches that and return their `name`
    function findMaxOrderCustomerId(maxOrder) {
        if (maxOrder) {
            return maxOrder.customer_id
        }
    }

    function findCustomerWithMaxOrder(maxOrderId, customers) {
        if (customers.length > 0) {
            const foundCustomer = customers.find(customer => customer.id === maxOrderId);
            return foundCustomer.name;
        }
    }

    const maxOrderCustomerId = findMaxOrderCustomerId(maxOrder[0])

    const maxCustomerName = findCustomerWithMaxOrder(maxOrderCustomerId, props.customers)

    return <h2>Customer with the most orders= {maxCustomerName}</h2>
}

export default MostCustomerOrdersRow
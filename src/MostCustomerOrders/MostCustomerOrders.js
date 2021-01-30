import React from 'react'
import styles from '../styles/Components.module.css'


function MostCustomerOrdersRow(props) {

    const totalPrices = props.orders.map((customer) => {
        return parseInt(customer.total_price);
    }
    )

    const maxTotalPrice = Math.max(...totalPrices);

    const maxOrder = props.orders.filter(order => order.total_price === maxTotalPrice)

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

    return <h2>Customer with the most orders= <span className={styles.green}>{maxCustomerName}</span></h2>
}

export default MostCustomerOrdersRow
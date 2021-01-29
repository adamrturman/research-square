import React from 'react'

function ExpensiveOrderRow(props) {

    const totalPrices = props.orders.map((customer) => {
        return parseInt(customer.total_price);
    }
    )

    const maxTotalPrice = Math.max(...totalPrices);
    return (
        <h2>Most Expensive Order: {maxTotalPrice}</h2>
    )
}

export default ExpensiveOrderRow
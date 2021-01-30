import React from 'react'

function TotalOrdersByYears(props) {

    function printTotalPriceOfOrders () {
        const sumByYear = props.orders.reduce((accumulator, order) => {
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
    return<h2>Total Orders by year: {mappedTotalsByYear}</h2>
}

export default TotalOrdersByYears
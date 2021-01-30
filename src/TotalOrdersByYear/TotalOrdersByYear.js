import React from 'react';
import styles from '../styles/Components.module.css';

function TotalOrdersByYears(props) {
    function getOrdersSumByYear() {
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

    const totalPriceOfOrders = getOrdersSumByYear()

    // converting the totalPriceOfOrders Map into an array of objects, each contains the year and order total
    const arrayOfTotalsByYear = Array.from(totalPriceOfOrders, ([year, total]) => ({ year, total }));

    const formattedTotalsByYear = arrayOfTotalsByYear.map(year => (
        <li>{year.year} - ${year.total}</li>
    ));

    return (
        <h2>
            Total Orders by year: <span className={styles.green}>{formattedTotalsByYear}</span>
        </h2>
    );
}

export default TotalOrdersByYears;

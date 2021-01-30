import axios from 'axios'

export async function fetchData(){
    return axios.get("https://cors-anywhere.herokuapp.com/https://rs-coding-exercise.s3.amazonaws.com/2020/orders-2020-02-10.json");
}
import axios from 'axios'

export async function fetchData(){
    axios.get("/2020/orders-2020-02-10.json")
}
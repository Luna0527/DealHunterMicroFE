import axios from 'axios'

const Api = axios.create({
    // baseURL: 'https://store.appdev.my.id/api'
    baseURL: 'http://localhost:8080/api/'

})

export default Api
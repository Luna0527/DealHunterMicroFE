import axios from 'axios'

const Api = axios.create({
    // baseURL: 'https://store.appdev.my.id/api'
    baseURL: 'http://159.223.50.155/api/'

})

export default Api
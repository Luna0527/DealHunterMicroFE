import { createApp } from 'vue'//,Vue
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue3-lazyload'

import 'vue2-animate/dist/vue2-animate.min.css'

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)

const app = createApp(App)

// 设置Axios的基本URL
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';
app.config.globalProperties.$axios = axios;


app.use(router)
app.use(store)
app.use(VueLazyLoad)

app.mixin({
    methods: {
        moneyFormat(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },

        calculateDiscount(product) {
            return product.price - (product.price * (product.discount) / 100)
        }
    }
})

app.mount('#app')
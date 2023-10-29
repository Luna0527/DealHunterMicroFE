import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyLoad from 'vue3-lazyload';
import VueCookies from 'vue-cookie-next'; // Import vue-cookie-next

import 'vue2-animate/dist/vue2-animate.min.css';

const app = createApp(App);

// 设置 Axios 的基本 URL
import axios from 'axios';
axios.defaults.baseURL = 'http://159.223.50.155';
app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);
app.use(VueLazyLoad);
app.use(VueCookies); // Use VueCookies

app.mixin({
    methods: {
        moneyFormat(value) {
            let val = (value / 1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },

        calculateDiscount(product) {
            return product.price - (product.price * (product.discount) / 100);
        }
    }
});

app.mount('#app');

import { createStore } from 'vuex'

import user from './module/user'
import order from './module/order'
import category from './module/category'
import slider from './module/slider'
import product from './module/product'
import cart from './module/cart'

export default createStore({
    modules: {
        user,
        order,
        category,
        slider,
        product,
        cart,
    }
})
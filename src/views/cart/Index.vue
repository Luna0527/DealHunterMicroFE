<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5>
                            <i class="fa fa-user-circle"></i> Personal Information
                            <router-link
                            :to="{ name: '' }"
                            class="btn btn-primary" style="margin-left: 120px;"
                            ><!-- v-if="!isLoggedIn" -->
                            Modify personal information
                            </router-link>
                            <router-link
                            :to="{ name: 'CreateAdm' }"
                             class="btn btn-primary" style="margin-left: 20px;"
                            ><!-- v-if="!isLoggedIn" -->
                            Create new admin
                            </router-link>
                        </h5>
                        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem" />
                        <div>
                        
                            <table class="table table-default">
                                <tbody>
                                    <tr>
                                        <td class="set-td text-left" width="60%">
                                            <p class="m-0">Username</p>
                                        </td>
                                        
                                        <td class="text-right set-td">
                                            <p
                                                class="m-0"
                                                id="subtotal"
                                            >{{  }}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="set-td text-left" width="60%">
                                            <p class="m-0">Password</p>
                                        </td>
                                        
                                        <td class="text-right set-td">
                                            <p
                                                class="m-0"
                                                id="subtotal"
                                            >{{  }}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="set-td text-left border-0">
                                            <p class="m-0">
                                               Email
                                                
                                            </p>
                                        </td>
                                        <td class="set-td border-0 text-right">
                                            <p
                                                class="m-0"
                                                id="ongkir-cart"
                                            >{{  }}</p>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                      
                    </div>
                </div>
            </div>
            <div class="col-md-6 mt-3 mt-md-0">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5>
                            <i class="fa fa-shopping-cart"></i> Interest List
                        </h5>
                        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem" />
                        <div class="row">
                            <div class="col-md-6 mt-3 mt-md-0">
                                <div class="form-group">
                              </div>
                            </div>     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Api from '../../api/Api'
// import { onMounted, computed, reactive } from 'vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import Swal from 'sweetalert2'

export default {
    setup() {
        // const store = useStore()

        // const router = useRouter()

    //     onMounted(() => {
    //         store.dispatch('cart/cartCount')
    //         store.dispatch('cart/cartTotal')
    //         store.dispatch('cart/cartWeight')
    //     })

    //     const carts = computed(() => {
    //         return store.getters['cart/getCart']
    //     })

    //     const cartCount = computed(() => {
    //         return store.getters['cart/cartCount']
    //     })

    //     const cartTotal = computed(() => {
    //         return store.state.cart.cartTotal
    //     })

    //     const cartWeight = computed(() => {
    //         return store.state.cart.cartWeight
    //     })

    //     const removeCart = (cart_id) => {
    //         store.dispatch('cart/removeCart', cart_id)
    //     }

    //     const state = reactive({
    //         name: '',
    //         phone: '',
    //         address: '',
    //         provinces: [],
    //         province_id: '',
    //         cities: [],
    //         city_id: '',
    //         courier: false,
    //         courier_type: '',
    //         cost: false,
    //         costs: '',
    //         costService: '',
    //         courier_cost: 0,
    //         courier_service: '',
    //         buttonCheckout: false,
    //         grandTotal: 0
    //     })

    //     const validation = reactive({
    //         name: false,
    //         phone: false,
    //         address: false
    //     })

    //     const provinces = onMounted(() => {
    //         Api.get('/rajaongkir/provinces')
    //             .then(response => {
    //                 state.provinces = response.data.data
    //             }).catch(error => {
    //                 console.log(error)
    //             })
    //     })

    //     const getCities = () => {
    //         Api.get('/rajaongkir/cities', {
    //             params: {
    //                 province_id: state.province_id
    //             }
    //         })
    //             .then(response => {
    //                 state.cities = response.data.data
    //             }).catch(error => {
    //                 console.log(error)
    //             })
    //     }

    //     const getCourier = () => {
    //         state.courier = true
    //     }

    //     const getOngkir = () => {
    //         if (cartWeight.value == 0) {
    //             Swal.fire({
    //                 title: "Oops...",
    //                 text: "Silahkan pilih produk terlebih dahulu!",
    //                 icon: "error",
    //             });
    //             return
    //         }

    //         Swal.fire({
    //             title: 'Loading...',
    //             text: 'Silahkan tunggu beberapa saat!',
    //             icon: "info",
    //             allowEscapeKey: false,
    //             allowOutsideClick: false,
    //             didOpen: () => {
    //                 Swal.showLoading()
    //             }
    //         })
    //         Api.post('/rajaongkir/checkOngkir', {
    //             city_destination: state.city_id,
    //             weight: cartWeight.value,
    //             courier: state.courier_type
    //         })
    //             .then(response => {
    //                 Swal.close()
    //                 state.cost = true

    //                 state.costs = response.data.data[0].costs
    //             }).catch(error => {
    //                 console.log(error)
    //             })
    //     }

    //     const getCostService = () => {
    //         let shipping = state.costService.split("|")

    //         state.courier_cost = shipping[0]
    //         state.courier_service = shipping[1]

    //         const token = store.state.auth.token

    //         Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    //         Api.get('cart/total')
    //             .then(response => {
    //                 state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost)
    //             })

    //         state.buttonCheckout = true
    //     }

    //     const checkout = () => {
    //         if (state.name && state.phone && state.address && cartWeight.value) {
    //             let data = {
    //                 name: state.name,
    //                 phone: state.phone,
    //                 province_id: state.province_id,
    //                 city_id: state.city_id,
    //                 courier_type: state.courier_type,
    //                 courier_service: state.courier_service,
    //                 courier_cost: state.courier_cost,
    //                 weight: cartWeight.value,
    //                 address: state.address,
    //                 grandTotal: state.grandTotal
    //             }

    //             Swal.fire({
    //                 title: 'Loading...',
    //                 text: 'Silahkan tunggu beberapa saat!',
    //                 icon: "info",
    //                 allowEscapeKey: false,
    //                 allowOutsideClick: false,
    //                 didOpen: () => {
    //                     Swal.showLoading()
    //                 }
    //             })
    //             store.dispatch('cart/checkout', data)
    //                 .then(response => {
    //                     Swal.close()
    //                     router.push({
    //                         name: 'detail_order',
    //                         params: {
    //                             snap_token: response[0].snap_token
    //                         }
    //                     })
    //                     Swal.fire({
    //                         title: "Success",
    //                         text: "Checkout berhasil.",
    //                         icon: "success",
    //                         showConfirmButton: false,
    //                         timer: 1500
    //                     });
    //                 }).catch(error => {
    //                     console.log(error)
    //                 })
    //         }

    //         if (!state.name) {
    //             validation.name = true
    //         }

    //         if (!state.phone) {
    //             validation.phone = true
    //         }

    //         if (!state.address) {
    //             validation.address = true
    //         }
    //     }

    //     return {
    //         carts,
    //         cartCount,
    //         cartTotal,
    //         cartWeight,
    //         removeCart,
    //         state,
    //         validation,
    //         provinces,
    //         getCities,
    //         getCourier,
    //         getOngkir,
    //         getCostService,
    //         checkout,
    //    }
     }
}
</script>
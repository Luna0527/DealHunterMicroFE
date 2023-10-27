<template>
    <header class="section-header top-0">
        <section class="header-main">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3 col-7">
                        <router-link
                            :to="{ name: 'home' }"
                            class="text-decoration-none"
                            data-abc="true"
                        >
                            <span class="logo" style="font-size: 22px;">
                                <img src="../assets/logo.jpg"  width="40" height="40">
                                <!-- <i class="fa fa-apple-alt"></i>  -->
                                <b style="margin-left: 5px;">Deal Hunter</b>
                            </span>
                        </router-link>
                    </div>
                    <div class="col-md-5 d-none d-md-block" >
                        <form class="search-wrap">
                            <div class="input-group w-100">
                                <select id="options" style="border: 1px solid #d0d0d0" v-model="selectedOption">
                                    <option value="product" selected>Product</option>
                                    <option value="brand">Brand</option>
                                </select>
                                <input
                                    type="text"
                                    class="form-control search-form"
                                    style="width:55%;background:#d0d0d0;border: 1px solid #d0d0d0"
                                    v-model="searchTerm"
                                    placeholder=""
                                />
                                 <div class="input-group-append">
                                    <router-link :to="getRoutePath" :replace="true">
                                        <template v-slot:default>
                                            <button class="btn search-button"  >
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </template>
                                    </router-link>
                                     
                                            <!-- <button class="btn search-button" @click="jump()" >
                                                <i class="fa fa-search"></i>
                                            </button>  -->
                                       

                                </div>
                            </div>
                        </form>
                        <!-- <div v-if="searchProducts.length > 0" class="autocomplete-products"> -->
                        
                            <!-- <router-link
                                v-for="product in searchProducts"
                                :key="product.id"
                                @click="selectProduct()"
                                :to="{ name: 'detail_product', params: { slug: product.slug } }"
                                class="autocomplete-product"
                            >
                                <i class="fa fa-search me-1"></i>
                                {{ product.title }}
                            </router-link> -->
                        </div>
                    
                    <div class="col-md-4 col-5" >
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <router-link
                                    :to="{ name: 'cart' }"
                                    class="btn cart-button btn-md"
                                    style="color: #ffffff;background-color: #ffb300;border-color: #ffffff;font-weight: 400;"
                                    v-if="isLoggedIn!=null"
                                >
                                    Personal Page
                                </router-link>
                            </div>
                            <div class="account">
                                <router-link
                                    :to="{ name: 'login' }"
                                    
                                    class="btn search-button btn-md d-none d-md-block ms-3"
                                    v-if="isLoggedIn==null" 
                                >
                                    <i class="fa fa-user-circle"></i> Login
                                </router-link>
                                <button
                                    @click="logout()"
                                    class="btn search-button btn-md d-none d-md-block ms-3"
                                    v-if="isLoggedIn!=null" 
                                >
                                    <i class="fa fa-user-circle"></i> Logout
                                </button>
                                <!-- <router-link
                                    :to="{ name: 'dashboard' }"
                                    v-else
                                    class="btn search-button btn-md d-none d-md-block ms-3"
                                >
                                    <i class="fa fa-tachometer-alt"></i> Dashboard
                                </router-link> -->
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </header>
</template>

<script>
//import VueRouter from 'vue-router';
// import { computed, onMounted, ref } from 'vue'
// import { useStore } from 'vuex'
// 引入 jQuery


export default {
  data() {
    return {
      selectedOption: 'product', // 默认选项
      searchTerm: '',
      isLoggedIn: localStorage.getItem('token'),
    //   monitoredVariable:localStorage.getItem('token')
    };
  },

  methods:{
    logout(){
    // 清除令牌和其他用户信息
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');

        this.$router.push({ name: 'home' }).then(() => {
        // 跳转完成后刷新页面
            location.reload();
        });
    },
    jump(){
          //const router = new VueRouter(); 
          console.log( this.searchTerm);
      // 根据选项构建不同的路由路径
      if (this.selectedOption === 'product') {
        if(this.searchTerm){
            console.log(this.searchTerm);
            // // 先执行路由跳转
            // this.$router.push({ name: 'DetailProduct', params: { name: this.searchTerm } }).then(() => {
            // // 跳转完成后刷新页面
            // location.reload();
            // });
            // location.reload(() => {
                this.$router.push({ name: 'loading', params: { name: this.searchTerm } });
                // this.$router.go(0); // 强制刷新当前路由

            // });

        }else{
            //location.reload(() => {
                this.$router.push({ name: 'loading' });
            //});
        }
      } else{
        if(this.searchTerm){
            return { name: 'DetailBrand', params: { name: this.searchTerm } };
        }else{
            return { name: 'DetailBrand'};
        }
      }
    }
  },
 

//   watch: {
//     monitoredVariable(token) {
//       console.log('Variable changed to:',token);
//       if(token != null) this.isLoggedIn = true;
//     },
//   },
// mounted() {
    // console.log("token"+this.$route.params.token);
    // if(this.$route.params.token!=null){
    //     this.isLoggedIn=true;
    // }
    
// },

  computed: {
    getRoutePath() {
        //const router = new VueRouter(); 
        console.log( this.searchTerm);
      // 根据选项构建不同的路由路径
    //   if (this.selectedOption === 'product') {
        if(this.searchTerm){
            console.log("u");
            return { name: 'loading', params: { name: this.searchTerm, cate: this.selectedOption }};
        }else{
            return { name: 'loading', params: { cate: this.selectedOption }};
        }
    //   } else{
    //     if(this.searchTerm){
    //         return { name: 'DetailBrand', params: { name: this.searchTerm }};
    //     }else{
    //         return { name: 'DetailBrand'};
    //     }
    //   }
      //return { name: 'DetailProduct' };
    }
  },

};
// }
//     setup() {
//         const store = useStore()

//         const searchTerm = ref('')

//         const isLoggedIn = computed(() => {
//             return store.getters['auth/isLoggedIn']
//         })//检查用户是否登陆

//         const cartCount = computed(() => {
//             return store.getters['cart/cartCount']
//         })//用于获取购物车中的物品数量

//         const cartTotal = computed(() => {
//             return store.getters['cart/cartTotal']
//         })//用于获取购物车中物品的总价

//         const products = computed(() => {
//             return store.state.product.products
//         })//用于获取产品列表

//         const searchProducts = computed(() => {
//             if (searchTerm.value === '') {
//                 return []
//             }
//             let matches = 0
//             return products.value.filter(product => {
//                 if (product.title.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 10) {
//                     matches++
//                     return product
//                 }
//             })
//         });//这是一个计算属性，用于根据用户输入的搜索词过滤产品列表并返回匹配的产品。它用户输入搜索词时动态计算。匹配的产品最多显示10个。

//         const selectProduct = () => {
//             searchTerm.value = ''
//         }// 这是一个函数，当用户选择某个产品后，会清空搜索词，以便用户继续浏览

//         onMounted(() => {
//             const token = store.state.auth.token

//             if (!token) {
//                 return
//             }

//             store.dispatch('cart/cartCount')
//             store.dispatch('cart/cartTotal')

//             store.dispatch('product/getProducts')
//         })//在组件挂载后，执行一些操作。在这里，它首先检查用户是否已登录，然后根据登录状态分别触发了获取购物车数量、购物车总价和产品列表的操作。

//         return {
//             store,
//             searchTerm,
//             isLoggedIn,
//             cartCount,
//             cartTotal,
//             products,
//             searchProducts,
//             selectProduct
//         }
//     }
// }
</script>

<style scoped>
.autocomplete-products {
    width: 40%;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 5px;
    position: absolute;
    z-index: 10;
    border-radius: 5px;
}

.autocomplete-product {
    display: block;
    text-decoration: none;
    color: #000000b3;
    padding: 10px 8px;
    cursor: pointer;
    border-radius: 5px;
}

.autocomplete-product:hover {
    background-color: #f3f4f5;
}
</style>
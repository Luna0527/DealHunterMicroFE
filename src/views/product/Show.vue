<template>
    <div class="container mt-5 mb-5">
         <!--<div class="row" >
            <div class="col-12 d-none d-md-block">
                <div class="card border-0 rounded shadow">
                    <content-loader
                        viewBox="0 0 420 135"
                        :speed="2"
                        primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb"
                    >
                        <rect x="5" y="7" rx="3" ry="3" width="130" height="120" />
                        <rect x="146" y="7" rx="3" ry="3" width="85" height="13" />
                        <rect x="146" y="34" rx="3" ry="3" width="50" height="7" />
                        <rect x="200" y="34" rx="3" ry="3" width="30" height="7" />
                        <rect x="146" y="52" rx="3" ry="3" width="63" height="7" />
                        <rect x="146" y="69" rx="3" ry="3" width="155" height="7" />
                        <rect x="146" y="88" rx="3" ry="3" width="40" height="7" />
                        <rect x="190" y="88" rx="3" ry="3" width="40" height="7" />
                        <rect x="146" y="109" rx="3" ry="3" width="267" height="18" />
                    </content-loader>
                </div>
            </div> -->
            <!-- <div class="col-12 d-block d-sm-block d-md-none">
                <div class="card border-0 rounded shadow">
                    <content-loader
                        viewBox="0 0 450 700"
                        :speed="2"
                        primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb"
                    >
                        <rect x="15" y="15" rx="5" ry="5" width="420" height="290" />
                        <rect x="15" y="336" rx="5" ry="5" width="350" height="42" />
                        <rect x="15" y="395" rx="5" ry="5" width="150" height="25" />
                        <rect x="180" y="395" rx="5" ry="5" width="100" height="25" />
                        <rect x="15" y="445" rx="5" ry="5" width="200" height="30" />
                        <rect x="15" y="505" rx="5" ry="5" width="400" height="25" />
                        <rect x="15" y="560" rx="5" ry="5" width="110" height="25" />
                        <rect x="140" y="560" rx="5" ry="5" width="110" height="25" />
                        <rect x="15" y="620" rx="5" ry="5" width="420" height="50" />
                    </content-loader>
                </div>
            </div> 
        </div>-->

        <div class="row">
    <div class="col-md-4"> <!-- 控制图片的宽度，这里使用col-md-4 -->
      <div class="card border-0 rounded shadow">
      <div class="card-body">
          <div class="d-flex justify-content-between">
              <label class="fw-bold" style="font-size: 20px;">{{ product.productname }}</label>
              
              <button class="btn btn-primary" v-if="isAdmin==1" @click="delPro" style="margin-left: 100px;">Delete</button>
              <button class="btn btn-primary" v-if="isLogin!=null" @click="showForm = true">Edit</button>
          </div>
          <div class="weight">
              <label class="fw-bold me-5" style="font-size: 18px;">Address:</label>
              <label>
                  <span class="fw-bold">{{ product.storeAddress }}</span>
              </label>
          </div>
          <div class="weight">
                    <label class="fw-bold me-3" style="font-size: 18px;">Description:</label>
                    <label>
                        <span class="fw-bold">{{ product.description }}</span>
                    </label>
          </div>
      </div>
    </div>
        <div class="card-img d-flex justify-content-center align-items-center">
            <img
              v-lazy="{ src: product.imageUrl }"
              class="w-100"
              style="height: 25em; object-fit: cover; border-top-left-radius: .25rem; border-top-right-radius: .25rem;"
            />
        </div>
    </div>

    <div class="col-md-8"> <!-- 控制右侧内容的宽度，这里使用col-md-8 -->
        <div class="card border-0 rounded shadow">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <label class="fw-bold" style="font-size: 20px; ">Histroy price chart</label>
                    <!-- <button class="btn btn-primary" @click="newpriceForm = true">I Got New Price</button> -->
                    <button
                    @click="isWatching ? delToWatch() : addToWatch()"
                    v-if="isLogin!=null" class="btn btn-primary" style="background-color: white; width: 55px; "
                >
                  
                <i :class="isWatching ? 'fa fa-heart fa-2x' : 'far fa-heart fa-2x'" style="color: darkorange;"></i>
                </button>
                </div>
                <!-- 其他内容... -->

                <!-- <div class="weight">
                    <label class="fw-bold me-3">Description:</label>
                    <label>
                        <span class="fw-bold">{{ product.description }}</span>
                    </label>
                </div>
                <div class="weight">
                    <label class="fw-bold me-5">Store Address:</label>
                    <label>
                        <span class="fw-bold">{{ product.storeAddress }}</span>
                    </label>
                </div> -->
                <div
                            class="discount mt-2 ms-1 d-flex align-items-center" style="color:rgb(56, 49, 49);font-weight: 700;"
                        >
                            Current Price：$ {{product.currentPrice}} 
                        </div>
                        <div>
                            <span
                                style="background-color: darkorange; font-size: 15px;"
                                class="badge badge-pill badge-success text-white mt-1 ms-0" 
                            >
                                Lowest Price：$
                                {{ product.lowestPrice }} 
                            </span>
                </div>
                <div>
                    <canvas ref="lineChart" width="400" height="400"></canvas>
                </div>
                <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem" />
                <!-- <button
                    @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)"
                    class="btn btn-primary btn-lg w-100"
                >
                    <i class="fa fa-shopping-cart"></i> Add to list
                </button> -->
                <button  class="btn btn-primary btn-lg w-100" v-if="isLogin!=null" @click="newpriceForm = true">I Got New Price</button>
            </div>
        </div>
    </div>
</div>
        <!-- Submit new price form -->
        <div v-if="newpriceForm"  class="fullscreen-form" >
          <div class="card border-0 rounded shadow" style="width: 50%;">
            <div class="card-body"  >
              <h5 class="card-title">I Got New Price</h5>
            
              <!-- Form starts here -->
              <form @submit.prevent="submitNewPrice" >
              <div class="mb-3">
                  <input type="number" id="newPrice" v-model="newPrice" class="form-control" step="0.01"  required>
                </div>

                 <!-- Submit button -->
               <button type="submit" class="btn btn-primary" style="margin-right: 10px;">Submit</button>
                
                <!-- Close button -->
                <button type="button" class="btn btn-secondary" @click="closenewPriceForm" >Close</button>
              </form>
              <!-- Form ends here -->
            </div>
          </div>
        </div>

        <!-- Edit Product form -->
        <!--Conditionally render the form based on showForm -->
        <div v-if="showForm"  class="fullscreen-form" >
          <div class="card border-0 rounded shadow" style="width: 50%;">
            <div class="card-body"  >
              <h5 class="card-title">Edit Product</h5>
              
              <!-- Form starts here -->
              <form @submit.prevent="submitForm" >
                <div class="mb-6" >
                  <label for="productname">Brand Name</label>
                  <input type="text" id="brandname" v-model="brandname" class="form-control" :readonly="true" maxlength="50" required>
                </div>
                <!-- Other form fields -->
                <div class="mb-6">
                  <label for="productname">Product Name</label>
                  <input type="text" id="productname" v-model="productname" class="form-control" maxlength="50" required>
                </div>

                <div class="mb-6">
                  <label for="storeAddress">Store Address</label>
                  <input type="text" id="storeAddress" v-model="storeAddress" class="form-control" maxlength="200" required>
                </div>

                <div class="mb-6">
                  <label for="description">Description</label>
                  <textarea id="description" v-model="description" class="form-control" maxlength="255"  required></textarea>
                </div>

               <!-- Submit button -->
               <button type="submit" class="btn btn-primary" style="margin-right: 10px;">Submit</button>
                
                <!-- Close button -->
                <button type="button" class="btn btn-secondary" @click="closeForm" >Close</button>

              </form>
              <!-- Form ends here -->

              </div>
            </div>
          </div>                    

    </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto'; // 导入 Chart.js 核心
import 'chartjs-adapter-date-fns'; // 导入日期适配器（如果需要）

// 假设你的 token 存储在变量中
const token = localStorage.getItem('token');

// 创建一个包含 token 的请求配置
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

export default {
  data() {
    return {
      isLoading: true,
      isWatching: false,
      product: {},
      priceHistory: [], // 新增价格历史数据
      formattedDates:[],
      lineChart: null, // 保存图表实例
      showForm:false,
      newpriceForm:false,
      productname:"",
      storeAddress:"",
      description:"",
      brandname:"",
      userId: localStorage.getItem('userId'),
      isAdmin: localStorage.getItem('isAdmin'),
      isLogin:localStorage.getItem('username'),
    };
  },
  mounted() {
    if(this.$route.params.id!=null){
      localStorage.setItem('proID', this.$route.params.id);
      console.log(localStorage.getItem('proID'));
    }

    //const productId = this.$route.params.id;
    if (localStorage.getItem('proID') != null) {
      // 使用 Axios 从后端接口获取产品详细信息
      axios
        .get(`http://localhost:8080/api/products/${localStorage.getItem('proID')}`)
        .then((response) => {
          this.product = response.data; // 将产品详细信息保存
          console.log(response.data);
          this.productname = this.product.productname;
          this.storeAddress = this.product.storeAddress;
          this.description = this.product.description;
          this.brandname = this.product.brandname;


          // 获取价格历史数据
          axios
            .get(`http://localhost:8080/api/priceHistory/price-history/product/${localStorage.getItem('proID')}`)
            .then((priceHistoryResponse) => {
              this.priceHistory = priceHistoryResponse.data; // 将价格历史数据保存
              console.log(priceHistoryResponse.data);
              console.log('Dates:', this.priceHistory.map(item => item.createDate));
              this.formattedDates =  this.convertToYYYYMMDD(this.priceHistory.map(item => item.createDate))
              console.log(this.formattedDates)
              console.log('Prices:', this.priceHistory.map(item => item.price));
              this.isLoading = false; // 加载完成
              // 在数据加载完成后创建图表
              this.$nextTick(() => {
                this.createLineChart();
              });
            })
            .catch((priceHistoryError) => {
              console.error('Error fetching price history data: ', priceHistoryError);
              this.isLoading = false; // 加载失败
            });

            if(localStorage.getItem('userId')!=null){
            //判断关注
            const url = `http://localhost:8080/api/products/${localStorage.getItem('proID')}/checkWatchers`;
      
           // 使用Vue Resource、Axios或其他HTTP请求库发送请求
           // 这里使用Axios作为示例
            axios.get(url,config)
          .then(response => {
            this.isWatching = response.data;
          })
          .catch(error => {
          console.error("检查关注状态时出错：", error);
          });
            }
           
        })
        .catch((error) => {
          console.error('Error fetching product data: ', error);
          this.isLoading = false; // 加载失败
        });
    }
  },
  methods: {
    delPro(){
  // 发起DELETE请求
    axios.delete(`http://localhost:8080/api/products/${localStorage.getItem('proID')}`, config)
  .then(response => {
    // 请求成功处理
    console.log('Delete successfully !',response.data);
    this.$router.push({ name: 'DetailProduct'});
  })
  .catch(error => {
    // 请求失败处理
    console.error('An error occurred while deleting the product：', error);
  });
    },
    addToWatch(){
      //const productId = this.$route.params.id;
      axios.post(`http://localhost:8080/api/products/${localStorage.getItem('proID')}/addWatchers`, null,config) 
      .then(response => {
    // 请求成功处理
        console.log('Add user follow successfully.', response.data);
        location.reload();
       })
      .catch(error => {
      // 请求失败处理
       console.error('An error occurred when users subscribe product:', error);
      });
    }, 

    delToWatch(){
      //const productId = this.$route.params.id;
      axios.delete(`http://localhost:8080/api/products/${localStorage.getItem('proID')}/deleteWatchers`,config) 
      .then(response => {
    // 请求成功处理
        console.log('Deleting user subscription successfully.', response.data);
        location.reload();
       })
      .catch(error => {
      // 请求失败处理
       console.error('An error occurred while unsubscribing：', error);
      });
    },

    closeForm() {
      this.showForm = false;
    },

    
    closenewPriceForm() {
      this.newpriceForm = false;
    },


    convertToYYYYMMDD(dateStrings) {
      return dateStrings.map(dateString => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });
    },

    createLineChart() {
      const ctx = this.$refs.lineChart.getContext('2d');

      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.formattedDates.map(item => item), // 日期作为X轴标签
          datasets: [
            {
              label: 'Price History',
              data: this.priceHistory.map(item => item.price), // 价格数据作为Y轴数据
              fill: false, // 不填充区域
              borderColor: 'rgb(75, 192, 192)', // 线的颜色
              tension: 0.4, // 折线的弯曲度
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxis: {
              type: 'time', // 如果X轴是日期，请使用时间轴
              time: {
                displayFormats: {
                  day: 'yyyy MM dd', // 设置日期显示格式
                },
              },
              title: {
                display: true,
                text: 'Date',
              },
            },
            // yAxis: {
            //   beginAtZero: true,
            //   title: {
            //     display: true,
            //     text: 'Price',
            //   },
            // },
          },
        },
      });
    },
    updateLineChart() {
      if (this.lineChart) {
        // 更新图表数据
        this.lineChart.data.labels = this.priceHistory.map(item => item.createDate);
        this.lineChart.data.datasets[0].data = this.priceHistory.map(item => item.price);
        this.lineChart.update();
      }
    },

    async submitNewPrice() {
      try {
        const url = `http://localhost:8080/api/products/${this.product.id}/submit-price?newPrice=${this.newPrice}`;
        const response = await axios.post(url,null,config);

        // 处理响应，如果需要的话
        console.log('Response:', response.data);
        this.closenewPriceForm();
        this.$router.push({ name: 'detail_category', params: { id: this.product.id } });
        location.reload();
        } catch (error) {
        console.error('Error submitting new price:', error);
      }
    },

    async submitForm() {

        // 构造发送给后端的数据对象
        const formData = {
        brand_id: this.product.brand.id,
        brandname: this.product.brandname,  // 填充相应的数据，例如品牌名称
        currentPrice: this.product.currentPrice,
        description: this.description,
        imageUrl: this.product.imageUrl,
        lowestPrice: this.product.lowestPrice,
        product_id:this.product.id,
        productname: this.productname,
        storeAddress: this.storeAddress,
      };
      console.log('edit upload data',formData)

      if(formData != null){
      try {
        // 发送 POST 请求
        const response = await axios.put('http://localhost:8080/api/products', formData, config);

        // 处理响应，例如检查是否成功保存数据
        console.log('Data saved successfully:', response.data);

        // 关闭表单
        this.closeForm();
        location.reload();

      } catch (error) {
        // 处理请求错误
        console.error('Error saving data:', error);
        }
      }
    },


  },
};





// import { onMounted } from 'vue'//computed, 
// import { useStore } from 'vuex'
// import { useRoute, useRouter } from 'vue-router'
// import { ContentLoader } from "vue-content-loader"

// export default {
//     components: { ContentLoader },
//     setup() {
//         const route = useRoute()

//         const router = useRouter()

//         const store = useStore()

        // onMounted(() => {
        //     store.dispatch('product/getDetailProduct', route.params.id)
        // })

        // const product = computed(() => {
        //     return store.state.product.product
        // })

        // const isLoading = computed(() => {
        //     return store.state.product.isLoading
        // })

//         const addToCart = (product_id, price, weight) => {
//             const token = store.state.auth.token

//             if (!token) {
//                 return router.push({ name: 'login' })
//             }

//             store.dispatch('cart/addToCart', {
//                 product_id: product_id,
//                 price: price,
//                 weight: weight,
//                 quantity: 1
//             })
//         }

//         return {
//             route,
//             router,
//             store,
//             // product,
//             // isLoading,
//             addToCart,
//         }
//     }
// }
</script>


<style>

</style>
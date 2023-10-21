<template>
    <div class="container mt-5 mb-5">
        <div class="row" v-if="isLoading">
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
            </div>
            <div class="col-12 d-block d-sm-block d-md-none">
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
        </div>
        <div class="row" v-else>
            <!-- <div class="col-md-4"> -->
                <!-- <div class="card border-0 rounded-3 shadow"> -->
                    <!-- <div class="card-body p-2">
                        <img :src="product.image" class="w-100 border-0 rounded" />
                    </div> -->
                <!-- </div> -->
            <!-- </div> -->
            <div class="col-md-8">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="fw-bold" style="font-size: 20px;">{{ product.productname }}</label>
                        <hr style="border-top: 1px solid rgb(84, 83, 83);border-radius:.5rem" />
                        <div
                            class="discount mt-2 d-flex align-items-center" style="color:rgb(56, 49, 49);font-weight: 700;"
                        
                        >
                            Current Price：$ {{product.currentPrice}}
                            <span
                                style="background-color: darkorange; font-size: 15px;"
                                class="badge badge-pill badge-success text-white ms-2" 
                            >
                                Lowest Price：$
                                {{ product.lowestPrice }} 
                            </span>
                        </div>
                        <!-- <div
                            class="price fw-bold mt-3"
                            style="color: #47b04b;font-size:18px"
                        >{{  product.lowestPrice  }}</div> -->
                        <p class="content mt-3" v-html="product.content"></p>
                        <div class="weight">
                            <label class="fw-bold me-5">Description</label>
                            <label>
                                <span class="fw-bold">{{ product.description }}</span> 
                            </label>
                        </div>
                        <div>
                        <canvas ref="lineChart"></canvas>
                        </div>
                        <hr style="border-top: 1px solid rgb(0 0 0);border-radius:.5rem" />
                        <button
                            @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)"
                            class="btn btn-primary btn-lg w-100"
                        >
                            <i class="fa fa-shopping-cart"></i> Add to list
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto'; // 导入 Chart.js 核心
import 'chartjs-adapter-date-fns'; // 导入日期适配器（如果需要）


export default {
  data() {
    return {
      isLoading: true,
      product: {},
      priceHistory: [], // 新增价格历史数据
      lineChart: null, // 保存图表实例
    };
  },
  mounted() {
    const productId = this.$route.params.id;
    if (productId != null) {
      // 使用 Axios 从后端接口获取产品详细信息
      axios
        .get(`http://localhost:8080/api/products/${productId}`)
        .then((response) => {
          this.product = response.data; // 将产品详细信息保存
          console.log(response.data);

          // 获取价格历史数据
          axios
            .get(`http://localhost:8080/api/priceHistory/price-history/product/${productId}`)
            .then((priceHistoryResponse) => {
              this.priceHistory = priceHistoryResponse.data; // 将价格历史数据保存
              console.log(priceHistoryResponse.data);
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
        })
        .catch((error) => {
          console.error('Error fetching product data: ', error);
          this.isLoading = false; // 加载失败
        });
    }
  },
  methods: {
    createLineChart() {
      const ctx = this.$refs.lineChart.getContext('2d');

      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.priceHistory.map(item => item.createDate), // 日期作为X轴标签
          datasets: [
            {
              label: 'Price History',
              data: this.priceHistory.map(item => item.price), // 价格数据作为Y轴数据
              fill: false, // 不填充区域
              borderColor: 'rgb(75, 192, 192)', // 线的颜色
              tension: 0.1, // 折线的弯曲度
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
            yAxis: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Price',
              },
            },
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
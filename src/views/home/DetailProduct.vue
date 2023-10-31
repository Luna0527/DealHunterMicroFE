<template>
          <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-12">
        <h4 class="fw-bold d-flex justify-content-between align-items-center">
          <span class="flex-grow-1">
          <i class="fa fa-shopping-bag"></i> Product
          </span>
          <!-- <button class="btn btn-primary" @click="showForm = true">Create</button> -->
          <button class="btn btn-primary"
            v-if="isLogin!=null"
            @click="showForm = true"
             ><!--  -->
            Create Product
          </button>
             <router-link
        :to="{ name: 'UpdBrand' }"
      class="btn btn-primary" style="margin-left: 20px;"
      v-if="isAdmin==1"
       ><!-- v-if="!isLoggedIn" -->
      Update Brand
       </router-link>
        </h4>
        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem" />
      </div>
    </div>
    <!-- <div class="row gy-2" v-if="isLoading"> -->
      <!-- 使用内容加载器或其他加载中的UI -->
      <!-- 省略内容 -->
    <!-- </div> -->

    <div v-if="showForm"  class="fullscreen-form">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h5 class="card-title">Create Product</h5>
              
              <!-- Form starts here -->
              <form @submit.prevent="submitForm">
                <!-- Dropdown for Brand -->
                <div class="mb-3">
                  <label for="brand">Brand</label>
                  <select v-model="selectedBrand" id="brand" class="form-control">
                    <!-- Populate with brand options -->
                    <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.brandname }}</option>
                  </select>
                </div>

                <!-- Other form fields -->
                <div class="mb-3">
                  <label for="productname">Product Name</label>
                  <input type="text" id="productname" v-model="productName" class="form-control" required>
                </div>

                <div class="mb-3">
                  <label for="storeAddress">Store Address</label>
                  <input type="text" id="storeAddress" v-model="storeAddress" class="form-control" required>
                </div>

                <div class="mb-3">
                  <label for="description">Description</label>
                  <textarea id="description" v-model="description" class="form-control" required></textarea>
                </div>

                <div class="mb-3">
                  <label for="currentPrice">Current Price</label>
                  <input type="text" id="currentPrice" v-model="currentPrice" class="form-control" required>
                </div>

                <div class="mb-3">
                  <label for="picture">Upload Picture</label>
                  <input type="file" id="picture" @change="handleFileChange" accept="image/*">
                </div>

                <!-- Close button -->
                <button type="button" class="btn btn-secondary" @click="closeForm">Close</button>

                <!-- Submit button -->
                <button type="submit" class="btn btn-primary" style="margin-left: 10px;">Submit</button>
              </form>
              <!-- Form ends here -->

              </div>
            </div>
          </div>
      

    <div  v-if="!showForm" class="row gy-2">
      <div v-for="product in products" :key="product.id" class="col-md-4 col-lg-3 col-12 mb-3">
      <router-link
        :to="{ name: 'detail_category', params: { id: product.id} }"
      >
        <!-- 循环渲染品牌数据 -->
        <div class="card border-0 shadow rounded-md">
          <div class="card-img">
            <!-- 显示产品图片  -->
            <img
              v-lazy="{ src: product.imageUrl }"
              class="w-100"
              style="height: 25em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;"
            />
          </div>
          <div class="card-body text-center">
            <p class="card-title" style="font-weight: bold;">{{ product.productName }}</p>
            <p class="card-title" style="font-weight:200;font-size: 11px;color: gray;">{{ product.brandName }}</p>
            <p class="card-title" style="font-weight:400;font-size: 14px;">Current Price ${{ product.currentPrice }}</p>
            <!-- 显示品牌名称 -->
            <!-- 其他品牌数据 -->
          </div>
        </div>
      </router-link>
    </div>
      </div>
    </div>



     
</template>

<!-- <style scoped>
.container-fluid {
  width: 100%; /* 设置宽度，根据需要自行调整 */
  height: 100%; /* 设置高度，根据需要自行调整 */
  background-image: url('../../assets/homebg.jpg'); /* 设置背景图的路径 */
  background-size: cover; /* 背景图的尺寸适应容器 */
  background-repeat: no-repeat; /* 防止背景图重复显示 */
}
</style> -->

<script>
// import Category from '../../components/Category'
//import Slider from '../../components/Slider'
import axios from 'axios'

// 假设你的 token 存储在变量中
const token = localStorage.getItem('token');

// 创建一个包含 token 的请求配置
const config = {
  headers: {
    'Authorization': `${token}`
  }
};

// import { initCustomFormatter } from 'vue';
// import { defineComponent} from 'vue'
//import { useStore } from 'vuex'
//import { useStore } from 'vuex', onMounted 
// import { ContentLoader } from "vue-content-loader"
export default {
  data() {
    return {
      isLoading: true,
      products: [], 
      showForm: false, // Initially set to false to hide the form
      selectedBrand: null,
      productName: '',
      storeAddress: '',
      description: '',
      currentPrice: null,
      picture: '',
      brands: [],
      isAdmin: localStorage.getItem('isAdmin'),
      isLogin:localStorage.getItem('username'),
    };
  },
  mounted() {
    
    if(this.$route.params.name!=null){
      // window.location.reload();
        axios
      .get('http://167.172.71.33:31003/api/product/productname', {
        params: {
          productName:this.$route.params.name// 你的产品名称
        },
      })
      .then((response) => {
        this.products = response.data; // 将数据保存
        console.log(response.data);
        this.isLoading = false; // 加载完成
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        this.isLoading = false; // 加载失败
      });
    }else{
        axios
      .get('http://167.172.71.33:31003/api/product/')
      .then((response) => {
        this.products = response.data; // 将数据保存
        console.log(response.data);
        this.isLoading = false; // 加载完成
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        this.isLoading = false; // 加载失败
      });
    }

    //所有brandlist
    axios
      .get('http://167.172.71.33:31003/api/brand/')
      .then((response) => {
        this.brands = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brand data: ', error);
      });

  
  },


  methods: {
    methods:{
    reload(){
        window.location.reload();
        
    }
  },
    init(){
      console.log("ppppppp");
    },
    closeForm() {
      // Reset form fields and close the form
      this.showForm = false;
      this.selectedBrand = null;
      this.productName = '';
      this.storeAddress = '';
      this.description = '';
      this.currentPrice = null;
      this.picture = '';

      // 刷新页面
    window.location.reload();
    },

    async handleFileChange(event) {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://167.172.71.33:31003/api/product/image/upload/', formData,config, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 存储上传结果
      this.resultFromUpload = response.data.result;
      console.log('Upload successful1:',  response);
      console.log('Upload successful:', this.resultFromUpload);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  },

    async submitForm() {

          const selectedBrandId = this.selectedBrand;
          
          // 根据id找到对应的品牌对象
          const selectedBrand = this.brands.find(brand => brand.id === selectedBrandId);

            // 构造发送给后端的数据对象
            const formData = {
            brand_id: this.selectedBrand,
            brandname: selectedBrand.brandname,  // 填充相应的数据，例如品牌名称
            currentPrice: this.currentPrice,
            description: this.description,
            imageUrl: this.resultFromUpload,
            productname: this.productName,
            storeAddress: this.storeAddress,
          };
          console.log(formData)

          if(formData != null){
          try {
            // 发送 POST 请求
            console.log(config);
            const response = await axios.post('http://167.172.71.33:31003/api/product/', formData, config);

            // 处理响应，例如检查是否成功保存数据
            console.log('Data saved successfully:', response.data);

            // 关闭表单
            this.closeForm();
          } catch (error) {
            // 处理请求错误
            console.error('Error saving data:', error);
          }
          }
       },
   },
  };
    
// };

</script>
<style>
.router-link-active {
    text-decoration: none;
    color: black;
  }
  a{
    text-decoration: none;
    color: black;
  }

  .fullscreen-form {
  position: fixed; /* 固定在视口中 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明的黑色背景蒙层 */
  display: flex;
  align-items: center;
  justify-content: center;
}
  </style>
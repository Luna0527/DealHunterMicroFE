<template>
          <div class="container-fluid mb-5 mt-4">
    <!-- <div class="row">
      <div class="col-md-12">
        <h4 class="fw-bold d-flex justify-content-between align-items-center">
          <span class="flex-grow-1">
          <i class="fa fa-shopping-bag"></i> Product
          </span>
          <button class="btn btn-primary" @click="showForm = true">Create</button>
        </h4>
        <hr style="border-top: 3px solid rgb(154 155 156);border-radius:.5rem" />
      </div>
    </div> -->
    <!-- <div class="row gy-2" v-if="isLoading"> -->
      <!-- 使用内容加载器或其他加载中的UI -->
      <!-- 省略内容 -->
    <!-- </div> -->

    
        <!-- Conditionally render the form based on showForm -->
        <div class="fullscreen-form">
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
                  <input type="text" id="productname" v-model="productName" class="form-control" maxlength="50"  required>
                </div>

                <div class="mb-3">
                  <label for="storeAddress">Store Address</label>
                  <input type="text" id="storeAddress" v-model="storeAddress" class="form-control" maxlength="200"  required>
                </div>

                <div class="mb-3">
                  <label for="description">Description</label>
                  <textarea id="description" v-model="description" class="form-control" maxlength="200"  required></textarea>
                </div>

                <div class="mb-3">
                  <label for="currentPrice">Current Price</label>
                  <input type="number" id="currentPrice" v-model="currentPrice" class="form-control" step="0.01"  required>
                </div>

                <div class="mb-3">
                  <label for="picture">Upload Picture</label>
                  <input type="file" id="picture" @change="handleFileChange" accept="image/*">
                </div>
                
                 <div v-if="errorMessage" class="error-message" style="color: red;">
                    {{ errorMessage }}
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
      errorMessage: ''
    };
  },

  mounted() {
  
    //所有brandlist
    axios
      .get('http://localhost:8080/api/brands')
      .then((response) => {
        this.brands = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brand data: ', error);
      });

  
  },


  methods: {
    closeForm() {
      // Reset form fields and close the form
      this.showForm = false;
      this.selectedBrand = null;
      this.productName = '';
      this.storeAddress = '';
      this.description = '';
      this.currentPrice = null;
      this.picture = '';

     // 跳转到 '/Product'
      this.$router.push({ name: 'DetailProduct' });
    },

    async handleFileChange(event) {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8080/api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 存储上传结果
      this.resultFromUpload = response.data.result;

      console.log('Upload successful:', this.resultFromUpload);
      this.errorMessage = '';
    } catch (error) {
      console.error('Upload failed:', error);

      // 判断具体的错误信息
      if (error.response && error.response.status === 500 && error.response.data.error === 'File size exceeds limit') {
        this.errorMessage = 'Please upload picture size below 1MB';
      } else {
        // 其他错误情况的处理
        this.errorMessage = 'Please upload picture size below 1MB';
      }

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
            const response = await axios.post('http://localhost:8080/api/products', formData);

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
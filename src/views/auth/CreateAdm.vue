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
              <h5 class="card-title">Create Admin</h5>
              
              <!-- Form starts here -->
              <form @submit.prevent="submitForm">
              

                <!-- Other form fields -->
                <div class="mb-3">
                  <label for="username">User Name</label>
                  <input type="text" id="username" v-model="username" class="form-control" required>
                </div>

                <div class="mb-3">
                  <label for="password">Password</label>
                  <input type="password" id="password" v-model="password" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label for="email">Email</label>
                  <input type="text" id="email" v-model="email" class="form-control" required />
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
      showForm: false, // Initially set to false to hide the form     
      username: '',
      password: '',
      email: '',
      errorMessage: ''
    };
  },



  methods: {
    closeForm() {
      // Reset form fields and close the form
      this.showForm = false;
      this.username = '';
      this.password = '';
      this.email = '';

     // 跳转到
      this.$router.push({ name: 'cart' });
    },


    async submitForm() {


            // 构造发送给后端的数据对象
            const formData = {

            username: this.username,
            password: this.password,
            email:this.email,
          };
          console.log(formData)

          if(formData != null&& token!=null){
          try {
            // 发送 POST 请求
            const response = await axios.post('http://159.223.50.155/api/user/admin/create', formData, config);

            // 处理响应，例如检查是否成功保存数据
            console.log('Data saved successfully:', response.data);
            alert('Create successful!');
            // 关闭表单
            this.closeForm();
          } catch (error) {
            // 处理请求错误
            // alert("Not authorized (Admin Only)!");
            this.closeForm();
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
<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body" >
                        <h4>Login</h4>
                        <hr />
                        <form >
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>User Name</label>
                                        <input
                                            type="text"
                                            v-model="username"
                                            class="form-control"
                                            placeholder="User Name"
                                        />
                                    </div>
                                    <!-- <div
                                        v-if="validation.name"
                                        class="mt-2 alert alert-danger"
                                    >{{ validation.name[0] }}</div> -->
                                </div>
                    
                            </div>
                            <div class="row mt-3 mb-3">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            v-model="password"
                                            class="form-control"
                                            placeholder="Password"
                                        />
                                    </div>
                                    <!-- <div
                                        v-if="validation.password"
                                        class="mt-2 alert alert-danger"
                                    >{{ validation.password[0] }}</div> -->
                                </div>
                                <!-- <div class="col-md-6 mt-3 mt-md-0">
                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            v-model="user.password_confirmation"
                                            class="form-control"
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                </div> -->
                            </div>
                            <input type="button" @click="login()" class="btn btn-primary w-100" value="Login">
                        </form>
                    </div>
                </div>
                <div class="register mt-3 text-center">
                    <p>
                        Don't have an account?
                        <router-link
                            :to="{ name: 'register' }"
                            class="text-decoration-none"
                        >Register Now!</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { useRouter } from 'vue-router';
import axios from 'axios'; 


export default {
data(){
  return {
    username:'',
    password:''
  };
},
  methods:{
    
    // eslint-disable-next-line no-unused-vars
    login() {
      console.log("in");
    //   const router = useRouter();
      const requestData = {
        username: this.username,
        password: this.password,
      };
      console.log(requestData);
  // 发起HTTP POST请求到后端的登录接口
  
  axios.post('http://159.223.50.155/api/user/login', requestData)
  .then(response => {
    // 处理后端的响应数据
    console.log(response.data);
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('isAdmin', response.data.isAdmin);
    // console.log(localStorage.getItem('token'));
    // console.log(localStorage.getItem('email'));
    console.log(localStorage.getItem('isAdmin'));
    alert('Login success!');
    this.$router.push({ name: 'home' }).then(() => {
    // 跳转完成后刷新页面
        location.reload();
    });
    
    // router.push('/product'); 
  })
  .catch(error => {
    // 处理登录失败的情况，例如显示错误消息
    console.error('失败', error);
    alert('Invaild username or password!');
  });
       },
      }
    
};

</script>
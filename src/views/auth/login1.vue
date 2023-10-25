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
  axios.post('http://localhost:8080/api/user/login', requestData)
  .then(response => {
    // 处理后端的响应数据
    console.log(response.data);
    localStorage.setItem('token', response.data.accessToken);
    console.log(localStorage.getItem('token'));
    alert('Login success!');
    this.$router.push({ name: 'home1', params: { token: localStorage.getItem('token') } });

    // router.push('/product'); 
  })
  .catch(error => {
    // 处理登录失败的情况，例如显示错误消息
    console.error('失败', error);
    alert('User login failed.');
  });
       },
      }
    
};
// import { ref, reactive } from 'vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import Swal from 'sweetalert2'

// export default {
//     setup() {
//         const user = reactive({
//             name: '',
//             email: '',
//             password: '',
//             password_confirmation: ''
//         })

//         const validation = ref([])

//         const store = useStore()

//         const router = useRouter()

//         const register = () => {
//             let name = user.name
//             let email = user.email
//             let password = user.password
//             let password_confirmation = user.password_confirmation

//             Swal.fire({
//                 title: 'Loading...',
//                 text: 'Just one moment!',
//                 icon: "info",
//                 allowEscapeKey: false,
//                 allowOutsideClick: false,
//                 didOpen: () => {
//                     Swal.showLoading()
//                 }
//             })
//             store.dispatch('auth/register', {
//                 name,
//                 email,
//                 password,
//                 password_confirmation
//             })
//                 .then(() => {
//                     Swal.close()
//                     router.push({ name: 'dashboard' })
//                     Swal.fire({
//                         title: "Success",
//                         text: "Registered.",
//                         icon: "success",
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                 }).catch(error => {
//                     Swal.close()
//                     validation.value = error
//                 })
//         }

//         return {
//             user,
//             validation,
//             register
//         }
//     }
// }
</script>
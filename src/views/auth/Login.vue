<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <!-- <div
                    v-if="validation.message"
                    class="mt-2 alert alert-danger"
                >{{ validation.message }}</div> -->
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h4>Login</h4>
                        <hr />
                        <form> 
                            <!-- @submit.prevent="login" -->
                            <div class="form-group">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    v-model="username"
                                    class="form-control"
                                    placeholder="User Name"
                                />
                            </div>

                            <div class="form-group mt-3">
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
                            >{{ validation.password[0] }}</div>
                            <hr /> -->
                            <button @click="login()" class="btn btn-primary w-100" style="margin-top: 10px;">Login</button>
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
// import { ref } from 'vue';
// import { useCookies } from 'vue-cookie-next'; // Import the cookie library
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
      // const router = useRouter();
      const requestData = {
        username: this.username,
        password: this.password,
      };
      console.log(requestData);
  // 发起HTTP POST请求到后端的登录接口
  axios.post('http://localhost:8080/api/user/login', requestData)
  .then(response => {
    console.log(response.data);
    alert(response.data.message);
    // router.push('/product'); 
    // 在这里可以根据需要处理响应数据，例如保存JWT令牌，显示用户信息，根据角色决定权限等等
  })
  .catch(error => {
    // 处理登录失败的情况，例如显示错误消息
    console.error('登录失败：', error);
    alert('Invalid username or password');
  });
       },
      }
    
};

    //   try {
    //     const response = await this.$axios.post('http://localhost:8080/api/user/login', requestData);

    //     if (response.data.code === 200) {
    //       // set('userName', userName.value); // Set a user-specific cookie
    //       console.log("login");
    //       router.push('/'); // Redirect to the home page after successful login
    //     } else {
    //       alert('Invalid username or password');
    //     }
    //   } catch (error) {
    //     alert('An error occurred during login');
    //   }
    // };

    // return {
    //   userName,
    //   password,
    //   login,
    // };
//   }；
// }，
// }；


// import { ref, nextTick } from 'vue';
// //import { useCookies } from 'vue-cookie-next';
// import { createCookie } from 'vue-cookie-next';
// import { useRouter } from 'vue-router';

// export default {
//   name: 'Login',
//   setup() {
//     const userName = ref('');
//     const password = ref('');

//     const { set: setCookie } = createCookie();// 在需要设置cookie时使用 setCookie 函数
//     //const { set } = useCookies();
//     const router = useRouter(); // 初始化router

//     const login = async() => {
//       const fd = new FormData();
//       fd.append('userName', userName.value);
//       fd.append('passwd', password.value);

//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };

//       // 使用router.push来导航
//       this.$axios.post('/login', fd, config).then(async(res) => {
//         alert(res.data.msg);
//         if (res.data.code === 200) {
//             setCookie('userName', fd.get('userName'));
//             await nextTick();
//           router.push('/'); // 使用router.push来导航
//         } else {
//           alert("invaild username or password");
//         }
//       }).catch((res) => {
//         alert(res.data.msg);
//       });
//     //   console.log(userName)
//     //   console.log(userName)
//     };

//     return {
//       userName,
//       password,
//       login,
//     };
//   },
// };
// import { ref, reactive } from 'vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import Swal from 'sweetalert2'

// export default {
//     setup() {
//         const user = reactive({
//             name: '',
//             password: ''
//         })

//         const validation = ref([])

//         const store = useStore()

//         const router = useRouter()

//         const login = () => {
//             let name = user.name
//             let password = user.password

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
//             store.dispatch('user/login', {
//                 name,
//                 password
//             })
//                 .then(() => {
//                     Swal.close()
//                     router.push({ name: 'dashboard' })
//                     Swal.fire({
//                         title: "Success",
//                         text: "Logged in.",
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
//             login
//         }
//     }
// }
</script>
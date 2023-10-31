<template>
    <div class="container-fluid mb-5 mt-4" >
        <!-- <div class="row"> -->
            <div class="col-md-6" >
                <div class="card border-0 shadow rounded">
                    <div class="card-body" >
                        <h5>
                            
                            <i class="fa fa-user-circle"></i> Personal Information
                            
                            <router-link
                            v-if="isAdmin==1"
                            :to="{ name: 'CreateAdm' }"
                             class="btn btn-primary" style="margin-right: 20px;margin-left: 20px;" 
                            ><!-- v-if="!isLoggedIn" -->
                            Create new admin
                            </router-link>
                            <router-link
                            :to="{ name: 'ChangePass' }"
                            class="btn btn-primary" style="margin-right: 20px;"
                            ><!-- v-if="!isLoggedIn" -->
                            Change password
                            </router-link>
                            <router-link
                            :to="{ name: 'ChangeEm' }"
                            class="btn btn-primary" 
                            ><!-- v-if="!isLoggedIn" -->
                            Change email
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
                                            >{{ this.username }}</p>
                                        </td>
                                    </tr>
                                    <!-- <tr>
                                        <td class="set-td text-left" width="60%">
                                            <p class="m-0">Password</p>
                                        </td>
                                        
                                        <td class="text-right set-td">
                                            <p
                                                class="m-0"
                                                id="subtotal"
                                            >{{  }}</p>
                                        </td>
                                    </tr> -->
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
                                            >{{ this.email }}</p>
                                        </td>
                                        
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                      
                    </div>
                </div>
            </div>
            <!-- <div class="col-md-6 mt-3 mt-md-0">
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
            </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
// import Api from '../../api/Api'
// import { onMounted, computed, reactive } from 'vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
// import Swal from 'sweetalert2'
import axios from 'axios'

export default {
    data() {
        return{
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            isAdmin: localStorage.getItem('isAdmin')
        };
    },
    mounted() {
        console.log(this.isAdmin);
        axios
      .get('http://167.172.71.33:31003/api/product/productname', {
        params: {
          productname:this.$route.params.name// 你的产品名称
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
    },
   
}
</script>

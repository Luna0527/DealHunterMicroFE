<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div
                    v-if="validation.message"
                    class="mt-2 alert alert-danger"
                >{{ validation.message }}</div>
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h4>Login</h4>
                        <hr />
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    v-model="user.name"
                                    class="form-control"
                                    placeholder="User Name"
                                />
                            </div>

                            <div class="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    v-model="user.password"
                                    class="form-control"
                                    placeholder="Password"
                                />
                            </div>
                            <div
                                v-if="validation.password"
                                class="mt-2 alert alert-danger"
                            >{{ validation.password[0] }}</div>
                            <hr />
                            <button type="submit" class="btn btn-primary w-100">Login</button>
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
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
    setup() {
        const user = reactive({
            name: '',
            password: ''
        })

        const validation = ref([])

        const store = useStore()

        const router = useRouter()

        const login = () => {
            let name = user.name
            let password = user.password

            Swal.fire({
                title: 'Loading...',
                text: 'Just one moment!',
                icon: "info",
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            store.dispatch('user/login', {
                name,
                password
            })
                .then(() => {
                    Swal.close()
                    router.push({ name: 'dashboard' })
                    Swal.fire({
                        title: "Success",
                        text: "Logged in.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }).catch(error => {
                    Swal.close()
                    validation.value = error
                })
        }

        return {
            user,
            validation,
            login
        }
    }
}
</script>
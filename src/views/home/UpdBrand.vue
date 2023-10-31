<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-12">
        <h4 class="fw-bold d-flex justify-content-between align-items-center">
          <span class="flex-grow-1">
            <i class="fa fa-shopping-bag"></i> Brand
          </span>
          <router-link :to="{ name: 'CreateBra' }" class="btn btn-primary" style="margin-left: 10px;">
            Create
          </router-link>
        </h4>
        <hr style="border-top: 3px solid rgb(154 155 156); border-radius: .5rem" />
      </div>
    </div>

    <div class="gy-2">
      <div v-for="(brand, index) in brands" :key="brand.id">
        <div class="row mb-3">
          <div class="col-md-12">
            <div class="card border-0 shadow rounded-md">
              <div class="card-body d-flex justify-content-between align-items-center">
                <!-- 用flex调伸展比例 -->
                <p class="card-title" style="flex: 0.5;font-weight: 400; color: gray; display: inline-block;">
                  <span>{{index+1}}</span>
                </p>
                <p class="card-title" style="flex: 0.7;font-weight: bold; display: inline-block;">
                  <span v-if="!brand.editMode">{{ brand.brandname }}</span>
                  <input v-else v-model="brand.brandname" />
                </p>
                <p class="card-title" style="flex: 0.7;font-weight: 400; color: gray; display: inline-block;">
                  <span>{{ brand.createDate }}</span>
                </p>
                <p class="card-title" style="flex: 0.7;font-weight: 400; color: gray; display: inline-block;">
                  <span v-if="!brand.editMode">{{ brand.description }}</span>
                  <input v-else v-model="brand.description" />
                </p>
                <button class="btn search-button" @click="toggleEditMode(brand)" style="flex: 1;font-weight: 600;">
                  {{ brand.editMode ? "Save" : "Modify" }}
                </button>
                <button class="btn search-button" @click="del(brand.id)" style=";margin-left: 5px; font-weight: 600;">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";


const token = localStorage.getItem('token');

// 创建一个包含 token 的请求配置
const config = {
  headers: {
    'Authorization': `${token}`
  }
};

export default {
  data() {
    return {
      editMode: false,
      brands: [],
      // index:1,
    };
  },
  mounted() {
    this.fetchBrandData();
  },

  methods: {
    convertToYYYYMMDD(dateStrings) {
      const date = new Date(dateStrings);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    fetchBrandData() {
      axios
        .get("http://167.172.71.33:31003/api/brand/")
        .then((response) => {
          this.brands = response.data.map((brand) => ({
            ...brand,
            createDate: this.convertToYYYYMMDD(brand.createDate),
            editMode: false, // 添加一个字段来表示编辑模式
          }));
         
          console.log("converted date:",this.formattedData);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching brand data: ", error);
        });
    },
    async toggleEditMode(brand) {
      // 切换编辑模式
      brand.editMode = !brand.editMode;
      if(brand.editMode == false){
      const formData = {
        id: brand.id,
        description: brand.description,
        brandname: brand.brandname,
      };
      if(formData != null){
        console.log(formData);
            axios
            .put('http://167.172.71.33:31003/api/brand/', formData, config)
            .then((response) => {
            // 处理响应，例如检查是否成功保存数据
            console.log('Data modofied successfully:', response.data);
            
          })
          .catch ((error) => {
            // 处理请求错误
            console.error('Error modofing data:', error);
          });
      }
    }
    },
    del(id) {
      console.log("Delete");
      axios
        .delete('http://167.172.71.33:31003/api/brand/' + id, config)
        .then((response) => {
          this.brands = response.data;
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting brand: ", error);
        });
    },
  },
};
</script>

  
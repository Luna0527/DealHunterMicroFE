<template>
    <div class="container mt-5 mb-5">
        Loading...
    </div>      
</template>

<script>
export default {
  mounted() {
    // 使用 setTimeout 延迟页面跳转
    setTimeout(() => {
        console.log("11111"+this.$route.params.name);
        if(this.$route.params.cate === 'product'){
            if(this.$route.params.name){
            this.$router.push({ name: 'DetailProduct', params: { name: this.$route.params.name } });
            }else{
                this.$router.push({ name: 'DetailProduct'});
            }
        }else{
            if(this.$route.params.name){
            this.$router.push({ name: 'DetailBrand', params: { name: this.$route.params.name } });
            }else{
                this.$router.push({ name: 'DetailBrand'});
            }
        }
        
    }, 300); // 0.5秒延迟
  }
}
</script>
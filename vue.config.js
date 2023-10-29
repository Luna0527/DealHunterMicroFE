const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port: 8081  } 
})

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     port: 8081,
//     proxy: {
//       "/api/": {
//         pathRewrite: { // 路径改写规则
//           '^/api': '' // 以/api/为开头的改写为'/'
//         },
//         target: 'http://159.223.50.155',
//         changeOrigin: true, // 跨域访问设置，true代表跨域
//         ws: true,
//         'secure': false, // false为http访问，true为https访问
//       },
//     },
//   },
// })

// // 添加日志消息
// console.log("Vue CLI proxy configuration loaded."); 
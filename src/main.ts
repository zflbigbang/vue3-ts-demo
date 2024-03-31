import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 完整引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app:any=createApp(App)
app.use(router).mount('#app')
app.use(ElementPlus)
 

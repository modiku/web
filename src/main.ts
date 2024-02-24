import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/css/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import $ from 'jquery'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use($)
app.mount('#app')


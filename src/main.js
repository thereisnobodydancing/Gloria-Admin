
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
const app = createApp(App)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.use(router)
app.mount('#app')
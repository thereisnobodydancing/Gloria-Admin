
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState))
  }
})
pinia.use(piniaPluginPersistedstate)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.use(router)
app.use(pinia)
app.mount('#app')
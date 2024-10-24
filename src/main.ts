import './app/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './app/router'

import { microkernelPlugin } from './app/microkernel/microkernelPlugin'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(microkernelPlugin)

router.isReady().then(() => {
  app.mount('#app')
})

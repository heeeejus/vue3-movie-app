import { createApp } from 'vue'
import App from './App.vue'
import store from './store'  // Same as './store/index.js'
import router from './router' // Same as './router/index.js'
import loadImage from './plugins/loadImage'

createApp(App)
  .use(store)
  .use(router)
  .use(loadImage)
  .mount('#app')

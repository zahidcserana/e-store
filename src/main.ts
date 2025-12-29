import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes/routes.js'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import './style.css'
import { useAppStore } from './pinia/appStore.js'

async function bootstrap() {
    const app = createApp(App)
    const pinia = createPinia()
    const head = createHead()

    app.use(pinia)
    app.use(Router)
    app.use(head)

    // ✅ Create app instance before using Pinia store
    const appStore = useAppStore()

    // ✅ Fetch global settings before mounting
    await appStore.fetchSettings()

    // ✅ Now safely mount the app
    app.mount('#app')
}

bootstrap()

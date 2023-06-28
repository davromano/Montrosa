import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router.ts'
import dotenv from 'dotenv';

dotenv.config();
const app = createApp(App);
app.use(router);
app.mount('#app');
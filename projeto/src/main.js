import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import 'swiper/css';
import 'swiper/css/pagination';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');

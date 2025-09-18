import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'swiper/css'
import 'swiper/css/pagination'

const app = createApp(App)
const pinia = createPinia()

const backgroundConfigs = {
  '/': { image: "url('/teste1.png')", repeat: 'no-repeat', size: 'cover', position: 'center' },
  '/cadastro': { image: "url('/alot-shark.jpg')", repeat: 'no-repeat', size: 'cover', position: 'center' },
  '/login': { image: "url('/alot-shark.jpg')", repeat: 'no-repeat', size: 'cover', position: 'center' },
  '/sobre-nos': { 
    image: "linear-gradient(to bottom, #0a6b85, #002c38)", 
    size: 'cover', 
    position: 'center' 
  },
  '/perfil-empreendedor': { color: '#04394a', image: '' },
  '/lojas': { 
    image: 'linear-gradient(to bottom, #0a6b85, #002c38)', 
    repeat: 'no-repeat', 
    size: 'cover', 
    position: 'center' 
  },
  default: { image: '' }
};

router.afterEach((to) => {
  const config = backgroundConfigs[to.path] || backgroundConfigs.default;
  document.body.style.backgroundImage = config.image || '';
  document.body.style.backgroundRepeat = config.repeat || '';
  document.body.style.backgroundSize = config.size || '';
  document.body.style.backgroundPosition = config.position || '';
  if (config.color) {
    document.body.style.backgroundColor = config.color;
  } else {
    document.body.style.backgroundColor = '';
  }
});

app.use(pinia)
app.use(router)
app.mount('#app')

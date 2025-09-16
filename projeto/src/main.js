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

router.afterEach((to) => {
  if (to.path === '/') {
    document.body.style.backgroundImage = "url('/teste1.png')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
  } else if (to.path === '/cadastro') {
    document.body.style.backgroundImage = "url('/alot-shark.jpg')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
  } else if (to.path === '/login') {
    document.body.style.backgroundImage = "url('/alot-shark.jpg')"
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
  } else if (to.path === '/sobre-nos') {
    document.body.style.backgroundImage =
      "linear-gradient(to bottom, #0a6b85, #002c38), url('/alot-shark.jpg')"
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
  } else if (to.path === '/perfil-empreendedor') {
    document.body.style.backgroundColor = '#04394a'
    document.body.style.backgroundImage = ''
  } else if (to.path === '/pagina-alimentos') {
    document.body.style.backgroundImage =
      'linear-gradient(to bottom, #04394A 0%, #04394A 40%, #F5F5F5 40%, #F5F5F5 100%)'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
  } else {
    document.body.style.backgroundImage = ''
  }
})

app.use(pinia)
app.use(router)
app.mount('#app')

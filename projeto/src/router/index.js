import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: () => import('@/views/CadastroView.vue')
    },
    {
      path: '/carrinho',
      name: 'Carrinho',
      component: () => import('@/views/CarrinhoView.vue')
    },
    {
        path: '/livro/:id',
        name: 'Produto',
        component: () => import('@/views/ProductView.vue'),
        props: true,
    },
    {
        path: '/sobre-nos',
        name: 'Sobre',
        component: () => import('@/views/SobreNosView.vue'),
    }
]

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes,
})

export default router

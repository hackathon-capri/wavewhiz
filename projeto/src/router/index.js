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
    path: '/carrinho/pagamento',
    name: 'Pagamento',
    component: () => import('@/views/PagamentoView.vue')
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: () => import('@/views/ProductView.vue'),
    props: true,
  },
  {
    path: '/sobre-nos',
    name: 'Sobre',
    component: () => import('@/views/SobreNosView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
   {
    path: '/perfil-empreendedor',
    name: 'PerfilEmpreendedor',
    component: () => import('@/views/PerfilEmpreendedorView.vue'),
  },
  {
    path: '/perfil-cliente',
    name: 'PerfilCliente',
    component: () => import('@/views/PerfilClienteView.vue'),
  },
    {
    path: '/add-produto',
    name: 'AdicionarProduto',
    component: () => import('@/views/AddProdutoView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

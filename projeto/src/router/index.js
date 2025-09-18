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
    path: '/cadastrar-loja',
    name: 'CadastrarLoja',
    component: () => import('@/views/LojaCadastroView.vue'),
  },
  {
    path: '/perfil-cliente',
    name: 'PerfilCliente',
    component: () => import('@/views/PerfilClienteView.vue'),
  },
  {
    path: '/lojas',
    name: 'Lojas',
    component: () => import('@/views/LojasView.vue'),
  },
    { path: '/carrinho/pagamento/compra-finalizada',
    name: 'CompraFinalizada',
    component: () => import('@/views/CompraFinalizadaView.vue'),
  },
   { path: '/loja/:id',
    name: 'Loja',
    component: () => import('@/views/LojaView.vue'),
    props: true,
  },
  { path: '/loja/:id/cadastrar-produto',
    name: 'CadastrarProduto',
    component: () => import('@/views/ProdutoCadastroView.vue'),
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

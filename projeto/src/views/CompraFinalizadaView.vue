<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { onMounted } from 'vue'

const router = useRouter()
const cartStore = useCartStore()

onMounted(() => {
  // Limpar o carrinho após a compra ser finalizada
  cartStore.currentCart = null
  cartStore.cartItems = []
})
</script>

<template>
  <main>
    <div class="success-container">
      <div class="success-icon">✓</div>
      <h1>Compra Finalizada com Sucesso!</h1>
      <p class="success-message">
        Obrigado por comprar na Wavewhiz! Sua compra foi processada com sucesso.
      </p>

      <div class="order-info">
        <h3>Informações do Pedido</h3>
        <p>Seu pedido foi confirmado e será processado em breve.</p>
        <p>Você receberá um e-mail com os detalhes da compra.</p>
      </div>

      <div class="actions">
        <button @click="router.push('/')" class="btn-primary">
          Continuar Comprando
        </button>
        <button @click="router.push('/perfil-cliente')" class="btn-secondary">
          Ver Meus Pedidos
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.success-container {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.success-icon {
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1rem;
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #d4edda;
  line-height: 80px;
  font-weight: bold;
}

h1 {
  color: #08607c;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.success-message {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.order-info {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.order-info h3 {
  color: #08607c;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.order-info p {
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #08607c;
  color: white;
}

.btn-primary:hover {
  background: #04394A;
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #08607c;
  border: 2px solid #08607c;
}

.btn-secondary:hover {
  background: #08607c;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .success-container {
    padding: 2rem;
    margin: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart.js';

const router = useRouter();
const cartStore = useCartStore();

const user = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
});

onMounted(async () => {
  if (user.value.id) {
    await cartStore.fetchCart();
  }
});

const decrementProductToCart = async (item) => {
  if (item.quantidade > 1) {
    await cartStore.updateCartItem(item.id, item.quantidade - 1);
  } else {
    await cartStore.removeFromCart(item.id);
  }
};

const incrementProductToCart = async (item) => {
  await cartStore.updateCartItem(item.id, item.quantidade + 1);
};

const removeItem = async (itemId) => {
  await cartStore.removeFromCart(itemId);
};

const clearCart = async () => {
  if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
    // Remover todos os itens do carrinho
    for (const item of cartStore.cartItems) {
      await cartStore.removeFromCart(item.id);
    }
  }
};
</script>

<template>
  <section class="cart">
    <div v-if="cartStore.loading" class="loading">Carregando carrinho...</div>
    <div v-else-if="cartStore.error" class="error">Erro: {{ cartStore.error }}</div>
    <div v-else-if="!user.id" class="error">Você precisa estar logado para ver o carrinho.</div>
    <div v-else-if="cartStore.cartItems.length === 0" class="empty-cart">
      <h2>Seu carrinho está vazio</h2>
      <p>Adicione produtos das lojas para começar suas compras!</p>
      <button @click="router.push('/')" class="continue-shopping-btn">Continuar Comprando</button>
    </div>
    <div v-else class="principal">
      <div class="left">
        <div class="cart-header">
          <h1>Seu Carrinho</h1>
          <button @click="clearCart" class="clear-cart-btn" :disabled="cartStore.loading">
            Esvaziar Carrinho
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
            <hr class="linha-th" />
          </thead>
          <tbody>
            <tr v-for="item in cartStore.cartItems" :key="item.id">
              <td class="cart-item">
                <img :src="item.produto.imagem || '/placeholder.jpg'" :alt="item.produto.nome" />
                <div class="cart-item-info">
                  <p class="cart-item-title">{{ item.produto.nome }}</p>
                  <p class="cart-item-loja">{{ item.produto.loja_nome || 'Loja' }}</p>
                </div>
              </td>
              <td>
                <div class="cart-item-quantity">
                  <button @click="decrementProductToCart(item)" class="plain decrement-btn" :disabled="cartStore.loading" title="Diminuir quantidade">
                    −
                  </button>
                  <span class="quantity-display">{{ item.quantidade }}</span>
                  <button @click="incrementProductToCart(item)" class="plain increment-btn" :disabled="cartStore.loading" title="Aumentar quantidade">
                    +
                  </button>
                </div>
              </td>
              <td class="cart-item-price">
                R$ {{ item.produto.preco }}
              </td>
              <td class="cart-item-subtotal">
                R$ {{ item.subtotal.toFixed(2) }}
              </td>
              <td>
                <button @click="removeItem(item.id)" class="remove-btn" :disabled="cartStore.loading">
                  Remover
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cart-summary">
        <div class="summary">
          <h2>Resumo do Pedido</h2>
          <hr class="linha-cart" />
          <div class="summary-items">
            <span>Subtotal</span> <span>R$ {{ cartStore.getCartTotal().toFixed(2) }}</span>
          </div>
          <hr class="linha-cart" />
          <button @click="router.push('/carrinho/pagamento')" :disabled="cartStore.loading">
            Ir para o Pagamento
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== Carrinho ===== */
.cart {
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 15px 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  font-size: 1.1rem;
  font-weight: 700;
  background-color: #08607c;
  color: white;
}
hr.linha-th {
  border-bottom: 2px solid #08607c;
  margin: 0;
  width: 100%;
}
.plain {
  background: #08607c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.plain:hover:not(:disabled) {
  background: #0e98c2;
}

.plain:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.quantity-display {
  font-size: 1.1rem;
  font-weight: 600;
  color: #08607c;
  min-width: 30px;
  text-align: center;
  padding: 5px 10px;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.decrement-btn {
  background: #dc3545 !important;
}

.decrement-btn:hover:not(:disabled) {
  background: #c82333 !important;
}

.increment-btn {
  background: #28a745 !important;
}

.increment-btn:hover:not(:disabled) {
  background: #218838 !important;
}

.cart-item-subtotal {
  font-size: 1.2rem;
  font-weight: 700;
  color: #08607c;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart-item img {
  width: 8vw;
  height: 6vw;
  max-width: 80px;
  max-height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #08607c;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cart-item-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.cart-item-loja {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.cart-item-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #08607c;
}
.principal {
  display: flex;
  background-color: #f1f1f1;
  width: 100%;
  gap: 20px;
}

.left {
  flex: 2;
  background-color: #f1f1f1;
  min-width: 0; /* Permite que o flex item diminua */
}

/* ===== Cart ===== */
.cart-summary {
  flex: 1;
  background-color: #dbdcdc;
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
  min-width: 300px;
  max-width: 400px;
}
.cart-summary button {
  width: 100%;
  padding: 15px 20px;
  border: none;
  background: #08607c;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.cart-summary button:hover:not(:disabled) {
  background: #0e98c2;
}

.cart-summary button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.summary {
  width: 100%;
}

.summary h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #08607c;
  margin: 0 0 15px 0;
  text-align: center;
}
hr.linha-cart {
  border: none;
  border-top: 2px solid #08607c;
  margin: 10px 0;
}
.summary-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
}
button {
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Estados de loading e erro */
.loading, .error, .empty-cart {
  text-align: center;
  padding: 50px 20px;
  background: white;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.error {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.empty-cart h2 {
  color: #08607c;
  margin-bottom: 20px;
}

.empty-cart p {
  color: #666;
  margin-bottom: 30px;
}

.continue-shopping-btn {
  background-color: #08607c;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.continue-shopping-btn:hover {
  background-color: #0e98c2;
}

/* Header do carrinho */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-header h1 {
  color: #08607c;
  font-size: 2rem;
  margin: 0;
}

.clear-cart-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.clear-cart-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.clear-cart-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Botão remover */
.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.remove-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.remove-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsividade */
@media (max-width: 768px) {
  .cart {
    padding: 10px;
    max-width: none;
  }

  .principal {
    flex-direction: column;
    gap: 15px;
  }

  .left {
    flex: none;
  }

  .cart-summary {
    flex: none;
    max-width: none;
    min-width: auto;
    padding: 15px;
  }

  .cart-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
    padding: 15px;
  }

  .cart-header h1 {
    font-size: 1.5rem;
  }

  th, td {
    padding: 10px 5px;
    font-size: 0.9rem;
  }

  .cart-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .plain {
    width: 25px;
    height: 25px;
    font-size: 16px;
  }

  .cart-item-info {
    align-items: center;
  }

  .cart-item-quantity {
    justify-content: center;
  }

  .quantity-display {
    font-size: 1rem;
    min-width: 25px;
    padding: 3px 8px;
  }

  .summary h2 {
    font-size: 1.1rem;
  }

  .summary-items {
    font-size: 1rem;
  }
}
</style>

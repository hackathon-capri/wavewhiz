<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart.js';
import { usePaymentStore } from '../stores/payment.js';

const router = useRouter();
const cartStore = useCartStore();
const paymentStore = usePaymentStore();

const selectedPaymentMethod = ref(null);
const paymentType = ref(''); // 'credito', 'debito', 'pix'

// Dados do cartão (para crédito/débito)
const cardData = ref({
  numero: '',
  nome: '',
  mes: '',
  ano: '',
  cvc: ''
});

// Dados do PIX
const pixData = ref({
  chave: ''
});

const user = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
});

onMounted(async () => {
  if (!user.value.id) {
    alert('Você precisa estar logado para finalizar a compra!');
    router.push('/login');
    return;
  }

  // Buscar carrinho e métodos de pagamento
  await cartStore.fetchCart();
  await paymentStore.fetchPaymentMethods();

  // Verificar se há itens no carrinho
  if (cartStore.cartItems.length === 0) {
    alert('Seu carrinho está vazio!');
    router.push('/carrinho');
    return;
  }
});

const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method;
  paymentType.value = method.nome.toLowerCase().includes('crédito') ? 'credito' :
                     method.nome.toLowerCase().includes('débito') ? 'debito' :
                     method.nome.toLowerCase().includes('pix') ? 'pix' : '';
};

const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};

const handleCardNumberInput = (event) => {
  const formatted = formatCardNumber(event.target.value);
  cardData.value.numero = formatted;
  event.target.value = formatted;
};

const validateForm = () => {
  if (!selectedPaymentMethod.value) {
    alert('Selecione um método de pagamento!');
    return false;
  }

  if (paymentType.value === 'credito' || paymentType.value === 'debito') {
    if (!cardData.value.numero || !cardData.value.nome || !cardData.value.mes || !cardData.value.ano || !cardData.value.cvc) {
      alert('Preencha todos os dados do cartão!');
      return false;
    }
  } else if (paymentType.value === 'pix') {
    if (!pixData.value.chave) {
      alert('Preencha a chave PIX!');
      return false;
    }
  }

  return true;
};

const finalizePurchase = async () => {
  if (!validateForm()) return;

  try {
    const success = await cartStore.finalizeCart(selectedPaymentMethod.value.id);
    if (success) {
      router.push('/carrinho/pagamento/compra-finalizada');
    }
  } catch (error) {
    console.error('Erro ao finalizar compra:', error);
    alert('Erro ao finalizar compra. Tente novamente.');
  }
};
</script>

<template>
  <main>
    <div v-if="cartStore.loading || paymentStore.loading" class="loading">
      Carregando...
    </div>
    <div v-else-if="cartStore.error || paymentStore.error" class="error">
      Erro: {{ cartStore.error || paymentStore.error }}
    </div>
    <div v-else-if="!user.id" class="error">
      Você precisa estar logado para finalizar a compra.
    </div>
    <div v-else-if="cartStore.cartItems.length === 0" class="error">
      Seu carrinho está vazio.
    </div>
    <div v-else class="maior">
      <div class="esquerda">
        <!-- Métodos de Pagamento -->
        <div class="payment-methods">
          <h3>Selecione o método de pagamento</h3>
          <div class="methods-grid">
            <div
              v-for="method in paymentStore.paymentMethods"
              :key="method.id"
              class="method-item"
              :class="{ 'method-selected': selectedPaymentMethod?.id === method.id }"
              @click="selectPaymentMethod(method)"
            >
              <h4>{{ method.nome }}</h4>
            </div>
          </div>
        </div>

        <!-- Formulário do Cartão -->
        <div v-if="paymentType === 'credito' || paymentType === 'debito'" class="card-form">
          <h3>Dados do Cartão</h3>
          <form @submit.prevent="finalizePurchase">
            <div class="dadosCartao">
              <ul class="lista">
                <li>
                  <label for="numero">Número do cartão:</label>
                  <input
                    type="tel"
                    id="numero"
                    v-model="cardData.numero"
                    @input="handleCardNumberInput"
                    placeholder="0000 0000 0000 0000"
                    maxlength="19"
                    required
                  />
                </li>
                <li>
                  <label for="nome">Titular do cartão:</label>
                  <input
                    type="text"
                    id="nome"
                    v-model="cardData.nome"
                    placeholder="Informe seu nome"
                    required
                  />
                </li>
              </ul>

              <div class="datacvc">
                <div class="datavalidade">
                  <label for="mes">Mês:</label>
                  <select id="mes" v-model="cardData.mes" required>
                    <option value="">Mês</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <label for="ano">Ano:</label>
                  <input
                    type="tel"
                    id="ano"
                    v-model="cardData.ano"
                    placeholder="2025"
                    maxlength="4"
                    required
                  />
                </div>

                <div class="cvc">
                  <label for="cvc">CVC:</label>
                  <input
                    type="tel"
                    id="cvc"
                    v-model="cardData.cvc"
                    placeholder="000"
                    maxlength="3"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Formulário do PIX -->
        <div v-if="paymentType === 'pix'" class="pix-form">
          <h3>Dados do PIX</h3>
          <div class="pix-data">
            <label for="chave-pix">Chave PIX:</label>
            <input
              type="text"
              id="chave-pix"
              v-model="pixData.chave"
              placeholder="Digite sua chave PIX"
              required
            />
          </div>
        </div>
      </div>

      <div class="direita">
        <h3>Resumo do Pedido</h3>
        <hr />

        <!-- Itens do carrinho -->
        <div class="cart-items">
          <div
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="cart-item-summary"
          >
            <div class="item-info">
              <span class="item-name">{{ item.produto.nome }}</span>
              <span class="item-qty">Qtd: {{ item.quantidade }}</span>
            </div>
            <span class="item-price">R$ {{ item.subtotal.toFixed(2) }}</span>
          </div>
        </div>

        <hr />
        <div class="subtotal">
          <p>Total</p>
          <p>R$ {{ cartStore.getCartTotal().toFixed(2) }}</p>
        </div>
        <hr />

        <div v-if="selectedPaymentMethod" class="selected-payment">
          <h4>Método de Pagamento</h4>
          <p>{{ selectedPaymentMethod.nome }}</p>
        </div>

        <button
          @click="finalizePurchase"
          class="finalizar"
          :disabled="cartStore.loading"
        >
          {{ cartStore.loading ? 'Finalizando...' : 'Finalizar Compra' }}
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

/* Estados de loading e erro */
.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  margin: 20px;
}

/* Métodos de Pagamento */
.payment-methods {
  margin: 0 0 3vw 0;
}

.payment-methods h3 {
  color: #04394a;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.method-item {
  background: #c7c3c3;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.method-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.method-selected {
  border-color: #04394a;
  background: #e8f4f8;
  transform: scale(1.02);
}

.method-item h4 {
  margin: 0;
  color: #04394a;
  font-size: 1.1rem;
}

/* Formulários */
.card-form, .pix-form {
  margin-top: 30px;
}

.card-form h3, .pix-form h3 {
  color: #04394a;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.dadosCartao {
  margin: 0;
}

.dadosCartao input {
  padding: 9px 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.dadosCartao ul li {
  list-style: none;
  margin-bottom: 15px;
}

.dadosCartao label {
  margin: 0 15px 5px 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: #04394a;
  display: block;
}

.datacvc {
  display: flex;
  gap: 20px;
  align-items: end;
}

.datavalidade select,
.datavalidade input {
  padding: 9px 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 10px;
}

.datavalidade {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cvc {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cvc input {
  width: 80px;
}

/* PIX Form */
.pix-data {
  margin-bottom: 20px;
}

.pix-data label {
  margin: 0 15px 5px 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: #04394a;
  display: block;
}

.pix-data input {
  padding: 9px 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
}

/* Resumo do Pedido */
.maior {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.direita {
  background-color: #dbdcdc;
  padding: 30px;
  border-radius: 10px;
  min-width: 350px;
}

.direita h3 {
  color: #04394a;
  margin: 0 0 20px 0;
  font-size: 1.8rem;
}

.direita hr {
  color: #04394a;
  margin: 15px 0;
}

.cart-items {
  margin: 20px 0;
}

.cart-item-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.cart-item-summary:last-child {
  border-bottom: none;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  font-weight: bold;
  color: #04394a;
}

.item-qty {
  font-size: 0.9rem;
  color: #666;
}

.item-price {
  font-weight: bold;
  color: #04394a;
}

.subtotal {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #04394a;
  font-size: 1.2rem;
  font-weight: bold;
}

.selected-payment {
  margin: 20px 0;
  padding: 15px;
  background: white;
  border-radius: 8px;
}

.selected-payment h4 {
  margin: 0 0 10px 0;
  color: #04394a;
  font-size: 1.1rem;
}

.selected-payment p {
  margin: 0;
  color: #04394a;
  font-weight: bold;
}

.finalizar {
  background-color: #04394a;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  display: block;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.finalizar:hover:not(:disabled) {
  background-color: #08607c;
}

.finalizar:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsividade */
@media (max-width: 768px) {
  .maior {
    flex-direction: column;
  }

  .direita {
    order: -1;
    margin-bottom: 20px;
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .datacvc {
    flex-direction: column;
    gap: 15px;
  }

  .datavalidade {
    flex-wrap: wrap;
  }
}
</style>

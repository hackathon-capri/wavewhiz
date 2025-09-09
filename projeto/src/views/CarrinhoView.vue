<script setup>
import router from '@/router'
import { ref } from 'vue'

const cart = ref({
  items: [],
  total: 0,
})

function decrementProductToCart(product) {
  const existingProduct = cart.value.items.find((item) => item.id === product.id)
  if (!existingProduct) return
  if (existingProduct.quantity === 1) {
    cart.value.items = cart.value.items.filter((item) => item.id !== product.id)
  } else {
    existingProduct.quantity--
  }
  cart.value.total -= product.price
}

function incrementProductToCart(product) {
  const existingProduct = cart.value.items.find((item) => item.id === product.id)
  if (!existingProduct) return
  existingProduct.quantity++
  cart.value.total += product.price
}
</script>

<template>
  <section class="cart">
    <div class="principal">
      <div class="left">
        <table>
          <thead>
            <tr>
              <th>Carrinho</th>
              <th>N° Itens</th>
              <th>Valor</th>
            </tr>
            <hr class="linha-th" />
          </thead>
          <tbody>
            <tr v-for="product in cart.items" :key="product.id">
              <td class="cart-item">
                <img :src="product.cover" :alt="product.title" />
                <div class="cart-item-info">
                  <p class="cart-item-title">{{ product.title }}</p>
                  <p class="cart-item-author">{{ product.author }}</p>
                  <p class="cart-item-price">R$ {{ product.price.toFixed(2) }}</p>
                </div>
              </td>
              <td>
                <div class="cart-item-quantity">
                  <button @click="decrementProductToCart(product)" class="plain">
                    <span class="mdi mdi-minus" />
                  </button>
                  {{ product.quantity }}
                  <button @click="incrementProductToCart(product)" class="plain">
                    <span class="mdi mdi-plus" />
                  </button>
                </div>
              </td>
              <td class="cart-item-subtotal">
                R$ {{ (product.price * product.quantity).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cart-summary">
        <div class="summary">
          <h2>Subtotal</h2>
          <hr class="linha-cart" />
          <div class="summary-items">
            <span>Produtos</span> <span>R$ {{ cart.total.toFixed(2) }}</span>
          </div>
          <hr class="linha-cart" />
          <button @click="router.push('/carrinho/pagamento')">Ir para o pagamento</button>
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
  align-items: flex-start;
  justify-content: center;
  /* padding: 5vh 8vw; */
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 40px 0;
}
th,
td {
  margin: 0 0 0 2vw;
  padding: 2vw;
  text-align: left;
}
th {
  font-size: 1.2rem;
  font-weight: 700;
}

td {
  border-bottom: 1px solid rgb(128, 128, 128);
  font-size: 1rem;
}
hr.linha-th {
  border-bottom: 2px solid #08607c;
  margin: 0 0 0 1vw;
  width: 100%;
}
.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 5px;
}

.cart-item-subtotal {
  font-size: 1.1rem;
  font-weight: 700;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
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

.cart-item-author {
  font-size: 1rem;
}

.cart-item-price {
  font-size: 1.1rem;
  font-weight: 600;
}
.principal {
  display: flex;
  background-color: #f1f1f1;
}
.left {
  margin: 0 55vw 0 0;
  background-color: #f1f1f1;
}

/* ===== Cart ===== */
.cart-summary {
  display: flex;
  width: 100%;
  background-color: #dbdcdc;
  margin: 0 0 0 5vw;
  padding: 20px 15px 18vw 20px;
}
.cart-summary button {
  padding: 12px 65px 12px 65px;
  margin: 6vw 0.5vw 0 0.5vw;
  border: none;
  background: #08607c;
  color: white;
  font-weight: bold;
}
.summary {
  margin: 5vw 0 0 0.8vw;
}
.summary h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #08607c;
  margin: 0 0 1vw 0;
}
hr.linha-cart {
  border-bottom: 2px solid #08607c;
  width: 100%;
}
.summary-items {
  display: grid;
  grid-template-columns: 3fr 1fr;
}

.summary-items span {
  padding: 10px 0;
  color: #08607c;
}
button {
  margin-top: 20px;
  cursor: pointer;
}
</style>

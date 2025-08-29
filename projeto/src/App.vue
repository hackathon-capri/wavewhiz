<script setup>
import { ref } from 'vue'

import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const showCart = ref(false)


const showPayment = ref(false)
const payment = ref({
  itens: [],
  total: 0,
})

function goToPayment() {
  showCart.value = false
  showPayment.value = true
}

const selected = ref('op1')

const products = [
  {
    id: 1,
    title: 'Comigo na livraria',
    cover: '/covers/comigo-na-livraria.png',
    price: 23.24,
    author: 'Martha Medeiros',
  },
  {
    id: 2,
    title: 'Quincas Borba',
    cover: '/covers/quincas-borba.png',
    price: 23.24,
    author: 'Machado de Assis',
  },
  {
    id: 3,
    title: 'A livraria',
    cover: '/covers/a-livraria.png',
    price: 13.94,
    author: 'Penelope Fitzgerald',
  },
  {
    id: 4,
    title: 'A hora da estrela',
    cover: '/covers/a-hora-da-estrela.png',
    price: 16.84,
    author: 'Clarice Lispector',
  },
  {
    id: 5,
    title: 'O alienista',
    cover: '/covers/o-alienista.png',
    price: 266.92,
    author: 'Machado de Assis',
  },
  {
    id: 6,
    title: 'Mar morto',
    cover: '/covers/mar-morto.png',
    price: 13.95,
    author: 'Jorge Amado',
  },
  {
    id: 7,
    title: 'Grande sertão',
    cover: '/covers/grande-sertao-veredas.png',
    price: 26.04,
    author: 'Guimarães Rosa',
  },
  {
    id: 8,
    title: 'Flor de poemas',
    cover: '/covers/flor-de-poema.png',
    price: 15.81,
    author: 'Cecília Meireles',
  },
]

function addToCart(product) {
  const existingProduct = cart.value.items.find((item) => item.id === product.id)
  if (existingProduct) {
    existingProduct.quantity++
  } else {
    cart.value.items.push({ ...product, quantity: 1 })
  }
  cart.value.total += product.price
  alert(`Adicionado ${product.title} ao carrinho!`)
}
const showLogin = ref(false);
</script>

<template>
  <header-component />
    <main>
      <RouterView />
    </main>
    <footer-component />



  <div class="container"></div>
  <section v-if="!showLogin">
    <main v-if="showPayment">
      <section class="payment">
        <section class="bandeiras">
          <div class="opcoes">
            <input type="radio" id="op1" value="op1" v-model="selected" name="bolinhas" />
            <label for="op1"><img src="/public/caixa-removebg-preview 1.png" alt="" /></label>

            <input type="radio" id="op2" value="op2" v-model="selected" name="bolinhas" />
            <label for="op2"><img src="/public/Elo-removebg-preview 1.png" alt="" /></label>

            <input type="radio" id="op3" value="op3" v-model="selected" name="bolinhas" />
            <label for="op3"><img src="/public/Visa-removebg-preview 1.png" alt="" /></label>

            <input type="radio" id="op4" value="op4" v-model="selected" name="bolinhas" />
            <label for="op4"><img src="/public/Mastercard-removebg-preview 1.png" alt="" /></label>
          </div>
        </section>
      </section>
    </main>

  </section>
</template>

<style scoped>




/* ===== Payment ===== */
.payment {
  background: white;
}
.bandeiras ul {
  display: flex;
}
.bandeiras label {
  background: #dbdcdc;
  padding: 8px;
  margin: 5vw 5vw 5vw 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 80px;
}
.bandeiras input {
    margin: 5vw 0 5vw 5vw;
}
.opcoes {
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
}

</style>

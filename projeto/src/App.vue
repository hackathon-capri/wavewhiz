<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import { Pagination } from 'swiper/modules'
import CadastroComponent from './components/CadastroComponent.vue'
import EmpreendedorComponent from './components/EmpreendedorComponent.vue'

const modules = [Pagination]

const showCart = ref(false)
const cart = ref({
  items: [],
  total: 0,
})

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
  <empreendedor-component></empreendedor-component>
    <cadastro-component v-if="showLogin" @close="showLogin = false"></cadastro-component>
  <div class="container"></div>
  <section v-if="!showLogin">
    <header>
      <nav>
        <div class="logo"><h1>WaveWhiz</h1></div>
        <div class="pesquisa">
          <span class="fa-solid fa-magnifying-glass"></span>
          <input type="text" placeholder="Pesquisar..." />
        </div>
        <div class="abas">
          <ul>
            <li class="icons"><span class="fa-solid fa-house"></span></li>
            <li class="sobre"><a href="#">Sobre</a></li>
            <li class="icons"><span class="fa-solid fa-user"></span></li>
            <li class="icons"><span class="fa-solid fa-bookmark"></span></li>
            <li @click="showCart = !showCart" class="icons">
              <span class="fa-solid fa-cart-shopping"></span>
            </li>
            <li class="icons"><span class="fa-solid fa-user" @click="showLogin = true" style="cursor: pointer;"></span></li>
            <li class="icons"><span class="fa-solid fa-list"></span></li>
          </ul>
        </div>
        <div class="categorias">
          <!-- quadrados -->
        </div>
      </nav>
    </header>
    <main v-if="showCart">
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
              <button @click="goToPayment">Ir para o pagamento</button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <main v-else-if="showPayment">
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
    <main v-else>
      <div class="introducao">
        <p class="seja">Seja</p>
        <h1>Bem-Vindo!</h1>
        <hr />
        <p class="texto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non rutrum mauris.
          Praesent ut sodales orci. Sed gravida enim a sem semper, ut ullamcorper purus venenatis.
          Integer ac tortor consequat, imperdiet est vitae, semper sapien.
        </p>
      </div>
      <div class="carrossel">
        <swiper
          :slidesPerView="2"
          :spaceBetween="90"
          :centeredSlides="true"
          :pagination="{ clickable: true }"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide>
            <div class="card1">
              <h1>teste</h1>
              <p>teste</p>
              <p>teste</p>
              <p>teste</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="card2">
              <h1>teste2</h1>
              <p>teste2</p>
              <p>teste2</p>
              <p>teste2</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="card3">
              <h1>teste3</h1>
              <p>teste2</p>
              <p>teste2</p>
              <p>teste2</p>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="card4">
              <h1>teste4</h1>
              <p>teste2</p>
              <p>teste2</p>
              <p>teste2</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </main>
    <footer>
      <img src="/public/logo-footer.png" alt="" />
      <div class="info">
        <p>Desenvolvimento:</p>
        <p>Ana Paula, Anna Flávia, Emilly, Kelly, Pietra.</p>
        <p><a href="tel:+5547999205622">+55 (47) 9 9920-5622</a></p>
      </div>
      <div class="aba-footer">
        <ul>
          <li>Inicio</li>
          <li>Sobre</li>
          <li @click="showLogin = true" style="cursor: pointer;">Cadastro</li>
          <li>Salvos</li>
          <li>Carrinho</li>
         </ul>
         </div>
         <div class="categoria-footer">
           <ul>
          <li>Lojas</li>
          <li>Artesanato</li>
          <li>Roupas</li>
          <li>Alimentação</li>
          <li>Outros</li>
        </ul>
      </div>
      <div class="socialmedia">
        <span class="fa-brands fa-square-instagram"></span>
        <span class="fa-brands fa-linkedin"></span>
      </div>
    </footer>
  </section>
</template>

<style scoped>
/* ===== Carrossel ===== */
.swiper {
  width: 95%;
  height: 100%;
  border-radius: 2vw;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #08607c;
  opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ===== Header ===== */
h1,
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
}

ul {
  display: flex;
  margin: 0 1vw 0 18vw;
}

ul li {
  list-style: none;
  margin: 0 10px;
  font-size: 1rem;
  color: white;
}

li.icons {
  font-size: 1.5rem;
  cursor: pointer;
}

ul li a {
  text-decoration: none;
  color: white;
}

ul li.sobre a {
  margin: 5px 0 0 0;
}

.logo h1 {
  text-align: left;
  color: white;
  font-size: 1.5rem;
}

.pesquisa {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 18vw 0 18vw;
}

.pesquisa span {
  position: absolute;
  left: 15vw;
  color: #888;
  font-size: 1rem;
  background: #f1f1f1;
}

.pesquisa input {
  width: 300px;
  height: 25px;
  border-radius: 30px;
  font-size: 1rem;
  border: 0;
  background-color: #f1f1f1;
  padding: 5px;
  outline: none;
}
.sobre {
  margin: 11px 0 0 0;
}
/* ===== Introdução ===== */
div.introducao {
  margin: 13vw 0 5vw 5vw;
}

div.introducao h1,
p {
  color: #f1f1f1;
}

div.introducao h1,
p.seja {
  font-family: 'Playfair Display', serif;
}

div.introducao h1 {
  margin: 0 2vw 0 0;
  font-size: 4rem;
}

div.introducao p {
  margin: 0 65vw 0 0;
  font-weight: bold;
  font-size: 0.95rem;
}

div.introducao p.seja {
  font-size: 2rem;
}

div.introducao p.texto {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

hr {
  border: none;
  height: 1.5px;
  background-color: #f1f1f1;
  width: 28.5%;
  margin: 10px 0;
}

/* ===== Footer ===== */
footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 80px;
  color: #f1f1f1;
  font-family: 'Inter', sans-serif;
  gap: 40px;
}

footer img {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  max-width: 220px;
}

.info p {
  margin: 4px 0;
}

.info a {
  text-decoration: none;
  color: #f1f1f1;
  font-weight: bold;
}

.aba-footer ul,
.categoria-footer ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}

.socialmedia {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 28px;
}

.socialmedia span {
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

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

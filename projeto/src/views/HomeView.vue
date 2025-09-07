<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

const modules = [Pagination]
const clientes = ref([])
onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/clientes/')
    clientes.value = response.data
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
  }
})
</script>

<template>
  <p>Pagina de Login</p>
  <div class="introducao">
    <p class="seja">Seja</p>
    <h1>Bem-Vindo!</h1>
    <hr />
    <p class="texto">
      Este site foi criado com o objetivo de facilitar o acesso às vendas e aos serviços oferecidos
      na comunidade do Capri, em São Francisco do Sul. Mais do que uma plataforma de compras, nosso
      portal é um espaço dedicado ao fortalecimento do comércio local, à valorização dos moradores e
      ao incentivo ao desenvolvimento da região. Capri é uma área rica em história, cultura e
      belezas naturais, mas que, por diversos fatores, ainda enfrenta desafios relacionados ao
      desenvolvimento e à visibilidade. Nosso site busca contribuir para mudar esse cenário,
      conectando vendedores locais a clientes da própria comunidade e de fora dela.
    </p>
    <div>
    <h2>Lista de Clientes</h2>
    <ul>
      <li v-for="cliente in clientes" :key="cliente.id">
        <p><strong>Nome:</strong> {{ cliente.nome }}</p>
        <p><strong>CPF:</strong> {{ cliente.cpf }}</p>
        <p><strong>Email:</strong> {{ cliente.email }}</p>
        <hr />
      </li>
    </ul>
  </div>
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

/* ===== Introdução ===== */
div.introducao {
  margin: 8vw 0 5vw 5vw;
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
  font-size: 5rem;
}

div.introducao p {
  margin: 0 65vw 0 0;
  font-weight: bold;
  font-size: 1rem;
}

div.introducao p.seja {
  font-size: 2rem;
}

div.introducao p.texto {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
}

hr {
  border: none;
  height: 1.5px;
  background-color: #f1f1f1;
  width: 28.5%;
  margin: 10px 0;
}
</style>

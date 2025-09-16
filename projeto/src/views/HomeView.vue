<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

const modules = [Pagination]
const clientes = ref([])
const router = useRouter()

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
  <main>
    <div class="introducao">
      <p class="seja">Seja</p>
      <h1>Bem-Vindo!</h1>
      <hr />
      <p class="texto">
        Nosso site conecta vendedores e clientes do Capri, em São Francisco do Sul, fortalecendo o comércio local,
        valorizando moradores e promovendo o desenvolvimento. Mais que uma plataforma de compras, é um espaço que une
        história, cultura e belezas naturais, dando visibilidade à região e incentivando oportunidades para toda a
        comunidade.
      </p>
    </div>

    <div class="clientes">
      <p @click="router.push('/perfil-cliente')" >Perfil Cliente</p>
      <p @click="router.push('/perfil-empreendedor')" >Perfil Empreendedor</p>
      <!-- Conteúdo comentado -->
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
          <div class="card1" @click="router.push('/pagina-alimentos')">
            <h1>Alimentos</h1>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card2">
            <h1>Artesanatos</h1>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card3">
            <h1>Roupas</h1>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="card4">
            <h1>Outros</h1>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </main>
</template>

<style scoped>
/* ===== Carrossel ===== */
.swiper {
  width: 95%;
  border-radius: 2vw;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #4e8b9e;
  opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2vw;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ===== Introdução ===== */
div.introducao {
  margin: 8vw 0 5vw 2vw;
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

/* ===== Lista de Clientes ===== */
div.clientes {
  margin: 5vw 0 5vw 5vw;
  color: #f1f1f1;
}

div.clientes h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

div.clientes ul {
  list-style: none;
  padding: 0;
}
.carrossel h1 {
  font-size: 2.5rem;
  margin: 3.2vw 0 0 0;
  text-align: center;
  color: #f1f1f1;
}
/* ===== Responsivo para até 768px ===== */
@media (max-width: 768px) {
  .swiper-slide {
    font-size: 15px;
    padding: 15px;
    margin: 3vw 0 0 0;
  }

  div.introducao {
    margin: 10vw 10vw;
  }

  div.introducao h1 {
    font-size: 2rem;
    text-align: center;
    margin-right: 0;
  }

  div.introducao p.seja {
    font-size: 1.4rem;
    text-align: center;
  }

  div.introducao p {
    font-size: 0.95rem;
    max-width: 95%;
    margin: 0 auto;
    text-align: center;
  }

  div.introducao p.texto {
    font-size: 0.95rem;
    margin-top: 1rem;
  }

  hr {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
const modules = [Pagination]


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

.token-display {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #f1f1f1;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  word-break: break-all;
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
/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 1366px) { /*Notebooks*/
  .swiper {
    width: 100%;
    padding: 0;
  }

  .swiper-slide {
    font-size: 16px;
    padding: 10px;
    margin: 2vw 0;
  }

  .carrossel h1 {
    font-size: 2rem;
    margin-bottom: 3vw;
  }

  div.introducao {
    margin: 5vw 5vw;
  }

  div.introducao h1 {
    font-size: 3.5rem;
    text-align: left;
    margin-right: 0;
  }

  div.introducao p.seja {
    font-size: 1.6rem;
    text-align: left;
  }

  div.introducao p {
    font-size: 1rem;
    max-width: 90%;
    margin: 0 0 1rem 0;
    text-align: left;
  }

  div.introducao p.texto {
    font-size: 1rem;
    margin-top: 1rem;
  }

  hr {
    width: 35%;
    margin-left: 0;
  }
}

@media (max-width: 768px) { /*Celulares*/
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

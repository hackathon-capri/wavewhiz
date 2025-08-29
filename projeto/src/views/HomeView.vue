<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

const modules = [Pagination]

</script>

<template>
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

</style>

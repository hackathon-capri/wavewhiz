<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
const modules = [Pagination]
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <div class="logo"><h1>WaveWhiz</h1></div>
        <div class="pesquisa">
          <span class="fa-solid fa-magnifying-glass"></span>
          <input type="" placeholder="" />
        </div>
        <div class="abas">
          <ul>
            <li class="icons"><span class="fa-solid fa-house"></span></li>
            <li class="sobre"><a href="#">Sobre</a></li>
            <li class="icons"><span class="fa-solid fa-user"></span></li>
            <li class="icons"><span class="fa-solid fa-list"></span></li>
          </ul>
        </div>
        <div class="categorias">
          <!-- quadrados -->
        </div>
      </nav>
    </header>
    <main>
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
          :pagination="{
            clickable: true,
          }"
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
            </div> </swiper-slide
          ><swiper-slide>
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
          <li>Cadastro</li>
          <li>Salvos</li>
          <li>Carrinho</li>
         </ul>
         </div>
         <div class="categoria-footer">
           <ul>
          <li>lojas</li>
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
  </div>
</template>
<style scoped>
.swiper {
  width: 95%;
  height: 100%;
  border-radius: 2vw;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #08607c;
  opacity: 60%;
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
input {
  width: 300px;
  height: 25px;
  border-radius: 30px;
  font-size: 1rem;
  border: 0;
  background-color: #f1f1f1;
  padding: 5px;
  outline: none;
}
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
  transition: transform 0.2s ease, color 0.2s ease;
}

</style>

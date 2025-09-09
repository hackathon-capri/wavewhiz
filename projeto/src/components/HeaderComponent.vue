<script setup>
import router from '@/router';

</script>

<template>
  <header>
      <nav>
        <div class="logo" @click="router.push('/')"><h1>WaveWhiz</h1></div>
        <div class="pesquisa">
          <span class="fa-solid fa-magnifying-glass"></span>
          <input type="text" placeholder="Pesquisar..." />
        </div>
        <div class="abas">
          <ul>
            <li @click="router.push('/')" class="icons"><span class="fa-solid fa-house"></span></li>
            <li @click="router.push('/sobre-nos')" class="sobre"><a href="#">Sobre</a></li>
            <li @click="router.push('/login')" class="icons"><span class="fa-solid fa-user"></span></li>
            <li @click="router.push('/perfilcliente')" class="icons"><span class="fa-solid fa-bookmark"></span></li>
            <li @click="router.push('/carrinho')" class="icons"><span class="fa-solid fa-cart-shopping"></span></li>
            </ul>
        </div>
        <div class="categorias">
          <!-- quadrados -->
        </div>
      </nav>
    </header>
</template>

<style scoped>
/* ===== Header ===== */
h1,
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 10px;
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
  font-weight: bold;
}

</style>

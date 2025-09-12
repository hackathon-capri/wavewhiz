<script setup>
import router from '@/router'
import { ref } from 'vue'
const menuAberto = ref(false)

const toggleMenu = () => {
  menuAberto.value = !menuAberto.value
}
</script>

<template>
  <header>
    <nav>
      <div class="logo" @click="router.push('/')">
        <h1>WaveWhiz</h1>
      </div>
      <div class="pesquisa">
        <span class="fa-solid fa-magnifying-glass"></span>
        <input type="text" />
      </div>
      <div class="hamburguer" @click="toggleMenu">
        <span class="fa-solid fa-bars"></span>
      </div>
      <div class="abas" :class="{ ativo: menuAberto }">
        <ul>
          <li @click="router.push('/')" class="icons"><span class="fa-solid fa-house"></span></li>
          <li @click="router.push('/sobre-nos')" class="sobre"><a href="#">Sobre</a></li>
          <li @click="router.push('/login')" class="icons">
            <span class="fa-solid fa-user"></span>
          </li>
          <li @click="router.push('/carrinho')" class="icons">
            <span class="fa-solid fa-cart-shopping"></span>
          </li>
        </ul>
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
  margin: 0 2vw 0 18vw;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.sobre {
  margin: 8px 0 0 0;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
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
  margin: 0 0 0 1vw;
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



/*---------->RESPONSIVIDADE<----------*/
.hamburguer {
  display: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: white;
  margin: 0 20px 0 0;
}
@media (max-width: 768px) {
  .logo h1 {
    font-size: 1.2rem;
  }

  .pesquisa {
    display: flex;
    margin: 0 10px;
    position: relative;
    justify-content: flex-start;
  }

  .pesquisa input {
    width: 120px;
    height: 25px;
    padding-right: 30px;
  }

  .pesquisa span {
    position: absolute;
    right: 10px;
    left: auto;
    color: #888;
    font-size: 1rem;
    background: transparent;
  }

  ul {
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: 15px;
    align-items: center;
  }

  .abas {
    flex-direction: column;
    background: #04394a;
    position: absolute;
    top: 60px;
    right: 10px;
    border-radius: 10px;

    max-height: 0;
    padding: 0;
    overflow: hidden;
    transform: translateY(-10px);
    transition: max-height 0.3s ease, transform 0.3s ease, padding 0.3s ease;
  }

  .abas.ativo {
    max-height: 500px;
    padding: 20px;
    transform: translateY(0);
  }

  .hamburguer {
    display: block;
  }
}
</style>

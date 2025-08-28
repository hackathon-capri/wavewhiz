<script setup>
import { ref } from 'vue'
</script>
<template>
    <div class="container">
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
            <li @click="showAbout = true" class="sobre"><span>Sobre</span></li>
            <li class="icons"><span class="fa-solid fa-user"></span></li>
            <li class="icons"><span class="fa-solid fa-bookmark"></span></li>
            <li class="icons">
              <span class="fa-solid fa-cart-shopping"></span>
            </li>
          </ul>
        </div>
        <div class="categorias">
          <!-- quadrados -->
        </div>
      </nav>
    </header>
    </div>
    <section v-if="showAbout">
        <main>
            <h1>hello world</h1>
        </main>
    </section>
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
          <li  @click="showAbout = !showAbout">Sobre</li>
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
</template>
    
<script setup>
import router from '@/router';

</script>

<template>
  <footer>
      <img src="/public/logo-footer.png" alt="" />
      <div class="info">
        <p>Desenvolvimento:</p>
        <p>Ana Paula, Anna Flávia, Emilly, Kelly, Pietra.</p>
        <p><a href="tel:+5547999205622">+55 (47) 9 9920-5622</a></p>
      </div>
      <div class="aba-footer">
        <ul>
          <li @click="router.push('/')" style="cursor: pointer;">Inicio</li>
          <li @click="router.push('/sobre-nos')" style="cursor: pointer;">Sobre</li>
          <li @click="router.push('/login')" style="cursor: pointer;">Login</li>
          <li>Salvos</li>
          <li @click="router.push('/carrinho')" style="cursor: pointer;">Carrinho</li>
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
</template>

<style scoped>
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

</style>

<script setup>
  const emit = defineEmits(['mostrarEmpreendedor'])
</script>

<template>
        <section>
            <div class="quadrado">
              <div class="detalhes">
                <div class="login">
                  <img src="/public/login-icon.png" alt="">
                  <h1>Como você quer se cadastrar?</h1>
                </div>
                <ul>
                  <li>
                    <span class="button" @click="emit('mostrarEmpreendedor')">EMPREENDEDOR</span>
                  </li>
                  <li>
                    <span class="button">CLIENTE</span>
                  </li>
                </ul>
              </div>
            </div>
        </section>

</template>

<style scoped>
main {
  font-family: 'Inter', sans-serif;
}
.formas {
  display: flex;
  gap: 20px;
}
.quadrado {
  margin: 5vw auto 5vw auto;
  width: 1300px;
  height: 600px;
  background-color: #08607C;
}
.detalhes {
  text-align: center;
  color: white;
  padding: 5vw 0 0 0;
}
.detalhes h1 {
  padding: 1.5vw 0 0 0;
}
.detalhes ul {
  padding: 3vw 0 0 0;
  display: flex;
  list-style: none;
  justify-content: center;
}
.detalhes ul li {
  padding: 0 5vw 0 5vw;
}
.button {
  font-size: 1.5rem;
  background-color: transparent;
  border: 4px solid white;
  color: white;
  display: inline-block;
  border-radius: 40px;
  font-weight: bold;
  width: 20vw;
  padding: 4vw 0 4vw 0;
}

.button:hover {
  background-color: white;
  color: #08607C;
  cursor: pointer;
  transition: 0.3s;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 80px;
  color: #f1f1f1;
  font-family: 'Inter', sans-serif;
  gap: 40px;
  background-color: #04394A;
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

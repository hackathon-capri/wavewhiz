<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <main>
  <h1>COMPRA FINALIZADA</h1>
  <button @click="router.push('/')">Voltar ao Início</button>
  </main>
</template>
<style scoped>
main{
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
h1{
  background: #08607c;
  color: white;
  margin: 7vw 3vw 0 0;
  padding: 30px 8vw;
}
button{
  margin: 1.6vw 1.5vw 22vw 0;
  background: white;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 2px solid #08607c;
  color: #04394A;
}
button:hover {
  color: #08607c;
  border-color: #04394A;
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { useLojasStore } from '../api/lojas.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const lojasStore = useLojasStore()
const categoriaNome = ref('')

onMounted(async () => {
  const categoriaId = route.query.categoria
  if (categoriaId) {
    const categorias = await lojasStore.fetchCategorias()
    const categoria = categorias.find(c => c.id == categoriaId)
    categoriaNome.value = categoria ? categoria.nome : ''
  }
  lojasStore.fetchLojas(categoriaId)
})
</script>

<template>
  <div class="introducao">
        <h1>Descubra as principais lojas <template v-if="categoriaNome !== ''">de <span class="categoria-nome">{{ categoriaNome }}</span></template></h1>
  <hr/>
  <p>
    Descubra as principais lojas do setor, reunidas em um só lugar. Encontre variedade, qualidade e praticidade para facilitar sua escolha.
  </p>
  </div>
    <div v-if="lojasStore.loading">Carregando lojas...</div>
    <div v-if="lojasStore.error">Erro ao carregar lojas: {{ lojasStore.error }}</div>
    <div class="lojas-list" v-if="!lojasStore.loading && !lojasStore.error">
      <div class="loja-item" v-for="loja in lojasStore.lojas" :key="loja.id">
        <img :src="loja.imagem || '/placeholder.jpg'" :alt="loja.nome" @click="router.push(`/loja/${loja.id}`)">
        <h2 @click="router.push(`/loja/${loja.id}`)">{{ loja.nome }}</h2>
      </div>
    </div>
</template>

<style scoped>
div.introducao {
  margin-left: 15px;
}
div.introducao h1 {
  color: white;
  font-family: 'Playfair Display', serif;
  margin-top: 5vw;
}
div.introducao strong {
  color: #98E6FF;
  font-family: 'Playfair Display', serif;
}
.categoria-nome {
  color: #98E6FF;
  font-family: 'Playfair Display', serif;
}
hr {
  border: none;
  height: 1.5px;
  background-color: white;
  width: 15%;
  margin: 10px 0;
}
div.introducao p {
  color: white;
  width: 28%;
}
.lojas-list {
  display: flex;
  margin-top: 3vw;
  margin-left: 15px;
}
.loja-item {
  margin: 2vw 4vw 2vw 4vw;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.loja-item img {
  border: solid 3px #08607C;
  border-radius: 20px;
  width: 12vw;
  height: 9vw;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.loja-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.loja-item h2 {
  font-size: 1.2rem;
  color: white;
  background-color: #08607C;
  border-radius: 100px;
  width: fit-content;
  padding: 5px 10px 5px 10px;
  margin-top: 10px;
  margin-left: 0;
}
</style>

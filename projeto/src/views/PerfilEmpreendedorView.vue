<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
import router from '@/router'
import { useLojasStore } from '../api/lojas.js'

const perfil = ref({})
const lojasStore = useLojasStore()
const minhasLojas = ref([])

onMounted(async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.id) {
      const res = await api.get(`/usuarios/${user.id}/`)
      perfil.value = res.data
      // Fetch stores by empreendedor
      minhasLojas.value = await lojasStore.fetchLojasByEmpreendedor(user.id)
    } else {
      console.error('Usuário não encontrado no localStorage')
    }
  } catch (err) {
    console.error('Erro ao buscar perfil ou lojas:', err)
  }
})

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<template>
  <div class="quadrado">
    <div class="detalhes">
  <img src="/login-icon.png" alt="Ícone de login" />
      <h1>Seu Perfil</h1>
    </div>
    <div class="listas">
      <div>
        <ul>
          <li>
            <p>Nome: {{ perfil.nome }}</p>
          </li>
          <li>
            <p>Email: {{ perfil.email }}</p>
          </li>
          <li>
            <p>CPF: {{ perfil.cpf }}</p>
          </li>
          <li>
            <p>Telefone: {{ perfil.telefone }}</p>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <p>Data de Nascimento: {{ perfil.data_nascimento }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="botoes">
      <button @click="router.push('/cadastrar-loja')">Cadastrar Loja</button>
      <button>Editar Dados</button>
      <button>Adicionar itens</button>
      <button @click="logout">Logout</button>
    </div>
    <div class="lojas-section">
      <h2>Suas Lojas</h2>
      <div v-if="minhasLojas.length === 0" class="no-lojas">
        Você ainda não cadastrou nenhuma loja.
      </div>
      <div v-else class="lojas-list">
        <div v-for="loja in minhasLojas" :key="loja.id" class="loja-item" @click="router.push(`/loja/${loja.id}`)">
          <img :src="loja.imagem || '/placeholder.jpg'" :alt="loja.nome" />
          <h3>{{ loja.nome }}</h3>
          <p>{{ loja.descricao }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quadrado {
  margin: 5vw auto;
  width: 1300px;
  min-height: 600px;
  border: 5px solid white;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
}
.detalhes {
  display: flex;
  align-items: center;
  margin: 20px 20px 20px 20px;
}
.detalhes img {
  height: 70px;
  width: 75px;
}
.detalhes h1 {
  font-size: 1.4rem;
  background-color: #08607C;
  padding: 10px 30px 10px 30px;
  margin-left: 15px;
  border-radius: 100px;
}
.listas {
  display: flex;
  margin-top: 7vw;
  font-size: 1.4rem;
}
.listas ul {
  list-style: none;
  margin: 0 10vw 0 10vw;
}
.listas li {
  margin-bottom: 20px;
}
.botoes {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
}

.botoes button {
  background-color: #08607C;
  color: white;
  border: none;
  padding: 15px 35px;
  font-weight: bold;
  border-radius: 100px;
  cursor: pointer;
  font-size: 1.2rem;
}

.botoes button:hover {
  background-color: #0e98c2;
  transition: 0.3s;
}

.lojas-section {
  margin-top: 3rem;
}

.lojas-section h2 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.no-lojas {
  color: white;
  text-align: center;
  font-size: 1.2rem;
}

.lojas-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.loja-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  width: 250px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.loja-item:hover {
  transform: scale(1.05);
}

.loja-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.5rem;
}

.loja-item h3 {
  color: white;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.loja-item p {
  color: #f1f1f1;
  font-size: 0.9rem;
  margin: 0;
}

/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 768px) {
  .quadrado {
    width: 95%;
    padding: 15px;
    min-height: auto;
  }

  .detalhes {
    align-items: flex-start;
    display: flex;
    align-items: center;
    margin: 20px 20px 20px 20px;
  }

  .detalhes img {
    height: 50px;
    width: 55px;
    margin: 0 8px 2px 0;
  }

  .detalhes h1 {
    font-size: 1.2rem;
    padding: 8px 20px;
    margin-left: 15px;
  }

  .listas {
    flex-direction: column;
    margin-top: 3rem;
    font-size: 1rem;
  }

  .listas ul {
    margin: 0 0 2rem 0;
  }

  .botoes {
    flex-direction: column;
    gap: 0.8rem;
  }

  .botoes button {
    width: 100%;
    padding: 12px 20px;
    font-size: 1rem;
  }
}
</style>

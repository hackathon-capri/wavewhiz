<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
import router from '@/router'

const perfil = ref({})

onMounted(async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.id) {
      const res = await api.get(`/usuarios/${user.id}/`)
      perfil.value = res.data
    } else {
      console.error('Usuário não encontrado no localStorage')
    }
  } catch (err) {
    console.error('Erro ao buscar perfil:', err)
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
          <li>
            <p>Role: {{ perfil.role }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="botoes">
      <button>Editar Dados</button>
      <button>Adicionar itens</button>
      <button @click="logout">Logout</button>
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

<script>
import router from '@/router'
import axios from 'axios'
</script>
<template>
  <main>
    <section>
      <div class="quadrado">
        <div class="detalhes">
          <img src="/login-icon.png" alt="Ícone de login" />
          <h1>Login</h1>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="formulario">
            <ul class="lista">
              <li>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
              </li>
              <li>
                <label for="senha">Senha:</label>
                <input type="password" id="senha" v-model="form.senha" maxlength="100" required />
              </li>
            </ul>
          </div>

          <div class="botoes">
            <button type="submit">Entrar</button>
            <button type="button" @click="resetForm">Limpar</button>
          </div>
        </form>
        <router-link to="/cadastro" class="cadastro">
          Ainda não é cadastrado? Clique aqui!
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  senha: '',
})

function resetForm() {
  form.email = ''
  form.senha = ''
}

async function handleSubmit() {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      email: form.email,
      password: form.senha,
    })

    // Tokens JWT retornados
    const { access, refresh } = response.data

    // Armazena no localStorage
    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)

    // Redireciona (ex: para página principal)
    router.push('/dashboard')
  } catch (error) {
    console.error('Erro no login:', error.response?.data || error.message)
    alert('Credenciais inválidas. Tente novamente.')
  }
}
</script>

<style scoped>

.quadrado {
  margin: 5vw auto;
  width: 600px;
  min-height: 400px;
  background: #04384a5d;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 10px;
}

.detalhes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.detalhes img {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.detalhes h1 {
  font-size: 1.6rem;
  background-color:#04394A;
  border-radius: 20px;
  padding: 0.6rem 1.5rem;
  text-align: center;
  color: white;
}

form {
  width: 100%;
}

.formulario {
  display: flex;
  justify-content: center;
}

.lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.lista li {
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}

input {
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  padding: 5px 0;
  font-size: 1rem;
  color: white;
}

input:focus {
  border-bottom: 2px solid #0abde3;
  outline: none;
}

.botoes {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
}

.botoes button {
  background-color: #04394A;
  color: white;
  border: none;
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.botoes button:hover {
  background-color: #08607C;
  transition: 0.3s;
}
.cadastro {
  display: block;
  margin: 1.5rem auto;
  color: #f1f1f1;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
}

/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 768px) {
  .quadrado {
    width: 90%;
    max-width: 600px;
    padding: 1.5rem;
    margin-top: 20vw;
  }

  .detalhes img {
    width: 50px;
    height: 50px;
  }

  .detalhes h1 {
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
  }

  .formulario {
    flex-direction: column;
    align-items: center;
  }

  .lista {
    width: 100%;
    gap: 1rem;
  }

  .lista li {
    flex-direction: column;
  }

  input {
    font-size: 0.95rem;
    width: 100%;
  }

  .botoes {
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    width: 100%;
  }

  .botoes button {
    width: 100%;
  }

  .cadastro {
    font-size: 0.95rem;
    margin: 1rem auto;
  }
}

</style>

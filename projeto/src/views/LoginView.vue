<script setup>
import { ref } from 'vue'
import router from '@/router'
import api from '@/api'
import { jwtDecode } from 'jwt-decode'

const email = ref('')
const password = ref('')
const error = ref('')

function resetForm() {
  email.value = ''
  password.value = ''
  error.value = ''
}

async function handleSubmit() {
  error.value = ''
  try {
    const payload = { email: email.value, password: password.value }
    const response = await api.post('/api/token/', payload)

    const { access, refresh } = response.data

    // Salva tokens
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    // Define header para requisições futuras
    api.defaults.headers.common.Authorization = `Bearer ${access}`

    // Decodifica o token para obter user_id (conforme settings.py do backend)
    const decoded = jwtDecode(access)
    const userId = decoded.user_id

    // Busca dados do usuário específico
    const userResponse = await api.get(`/usuarios/${userId}/`)
    const user = userResponse.data // Agora é um objeto único
    localStorage.setItem('user', JSON.stringify(user))

    // Redireciona baseado no role
    if (user.role === 'cliente') {
      router.push('/perfil-cliente')
    } else if (user.role === 'empreendedor') {
      router.push('/perfil-empreendedor')
    } else {
      router.push('/') // Para admin ou outros
    }
  } catch (err) {
    error.value = err.response?.data?.detail || err.response?.data || 'Credenciais inválidas. Tente novamente.'
    console.error('Erro no login:', err.response?.data || err.message)
  }
}
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
                <input type="email" id="email" v-model="email" required />
              </li>
              <li>
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="password" maxlength="100" required />
              </li>
            </ul>
          </div>

          <div class="botoes">
            <button type="submit">Entrar</button>
            <button type="button" @click="resetForm">Limpar</button>
          </div>

          <div v-if="error" class="error" style="color:#f66; text-align:center; margin-top:12px;">
            {{ error }}
          </div>
        </form>

        <router-link to="/cadastro" class="cadastro">
          Ainda não é cadastrado? Clique aqui!
        </router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* mantive seus estilos existentes */
.quadrado {
  margin: 5vw auto;
  width: 700px;
  height: 600px;
  background: #04384aa6;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 20px;
}

.detalhes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 20px 0;
}

.detalhes img {
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
  margin: 27px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  font-size: 1.3rem;
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
  padding: 20px 60px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.3rem;
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

.error { color: #f66; margin-top: 8px; }

/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 1366px) {
  .quadrado {
    width: 600px;
    height: auto;
    padding: 2rem;
    margin: 6vw auto;
  }

  .detalhes h1 {
    font-size: 1.5rem;
    padding: 0.5rem 1.2rem;
  }

  .lista {
    font-size: 1.1rem;
    gap: 1.2rem;
  }

  .botoes button {
    font-size: 1.1rem;
    padding: 16px 50px;
  }

  .cadastro {
    font-size: 0.95rem;
    margin-top: 1.2rem;
  }
}

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

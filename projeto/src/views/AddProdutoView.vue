<script setup>
import { ref } from 'vue'

const arquivos = ref([])
const produto = ref('')
const preco = ref('')
const descricao = ref('')

function handleFileChange(event) {
  const files = event.target.files

  if (files.length > 3) {
    alert('Você só pode enviar no máximo 3 fotos!')
    event.target.value = ''
    arquivos.value = []
    return
  }

  arquivos.value = Array.from(files).map(file => ({
    file,
    url: URL.createObjectURL(file)
  }))
}

function resetForm() {
  arquivos.value = []
  produto.value = ''
  preco.value = ''
  descricao.value = ''
  document.getElementById("arquivos-fotos").value = ""
}
</script>

<template>
  <div class="quadrado">
    <div class="detalhes">
      <img src="/login-icon.png" alt="Ícone de login" />
      <h1>Adicione seu item:</h1>
    </div>

    <div class="conteudo">
      <div class="listas">
        <ul>
          <li>
            <label>Nome do Produto:</label>
            <input type="text" v-model="produto" placeholder="________________" />
          </li>
          <li>
            <label>Precificação:</label>
            <input type="text" v-model="preco" placeholder="________________" />
          </li>
          <li>
            <label>Descrição:</label>
            <input type="text" v-model="descricao" placeholder="________________" />
          </li>
        </ul>
      </div>

      <div class="foto-container">
        <div class="foto-preview" v-for="(foto, index) in arquivos" :key="index">
          <img :src="foto.url" alt="Foto selecionada" />
        </div>

        <label for="arquivos-fotos" class="foto-card" v-if="arquivos.length === 0">
          <span>*FOTO</span>
        </label>

        <p class="foto-info">{{ arquivos.length }}/3 Fotos</p>

        <input
          type="file"
          id="arquivos-fotos"
          name="arquivos-fotos"
          accept="image/*"
          multiple
          hidden
          @change="handleFileChange"
        />
      </div>
    </div>

    <div class="botoes">
      <button type="submit">ENVIAR</button>
      <button type="button" @click="resetForm">LIMPAR</button>
    </div>
  </div>
</template>

<style scoped>
.quadrado {
  margin: 5vw auto;
  max-width: 1300px;
  min-height: 400px;
  border: 5px solid white;
  padding: 5%;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
}

.detalhes {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  gap: 15px;
}

.detalhes img {
  height: 70px;
  width: 75px;
}

.detalhes h1 {
  font-size: 1.4rem;
  background-color: #08607c;
  padding: 10px 30px;
  margin-left: 15px;
  border-radius: 100px;
}

.conteudo {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 3% 5%;
  gap: 2rem;
}

.listas ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.listas li {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.listas label {
  min-width: 120px;
  font-size: 1.2rem;
}

.listas input {
  border: none;
  background: transparent;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 5px;
  width: 200px;
}

.listas input::placeholder {
  color: white;
  opacity: 0.7;
}

.foto-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.foto-preview img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid white;
  border-radius: 10px;
}

.foto-card {
  width: 120px;
  height: 120px;
  background: #f5f5f5;
  border: 2px dashed #08607c;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #08607c;
  font-weight: bold;
}

.foto-info {
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
}

.botoes {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.botoes button {
  background-color: #08607c;
  color: white;
  border: none;
  padding: 12px 35px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
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

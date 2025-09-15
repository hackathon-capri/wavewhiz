<script setup>
import { ref, onMounted } from 'vue'

const perfil = ref({})

onMounted(async () => {
  const res = await fetch('http://127.0.0.1:8000/api/perfil/1/')
  perfil.value = await res.json()
})
</script>

<template>
  <div class="quadrado">
    <div class="detalhes">
      <img src="/public/login-icon.png" alt="Ícone de login" />
      <h1>Seu Perfil</h1>
    </div>

    <div class="dados" v-if="perfil.nome_loja">
      <div class="coluna">
        <p><strong>Nome da Loja:</strong> {{ perfil.nome_loja }}</p>
        <p><strong>Endereço:</strong> {{ perfil.endereco }}</p>
        <p><strong>CPF/CNPJ:</strong> {{ perfil.cpf_cnpj }}</p>
        <p><strong>Categoria:</strong> {{ perfil.categoria }}</p>
      </div>
      <div class="coluna">
        <p><strong>Nome de Usuário:</strong> {{ perfil.nome_usuario }}</p>
        <p><strong>Data de Nascimento:</strong> {{ perfil.data_nascimento }}</p>
        <p><strong>Telefone:</strong> {{ perfil.telefone }}</p>
        <p><strong>E-mail:</strong> {{ perfil.email }}</p>
      </div>
    </div>

    <div class="botoes">
      <button>Editar Dados</button>
      <button>Adicionar itens</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cliente = ref(null);

onMounted(() => {
  const data = localStorage.getItem("cliente");
  if (data) {
    cliente.value = JSON.parse(data);
  }
});
</script>

<template>
  <main>
    <section class="perfil">
      <h1>Perfil do Cliente</h1>

      <div v-if="cliente">
        <p><strong>Nome:</strong> {{ cliente.nome }}</p>
        <p><strong>Email:</strong> {{ cliente.email }}</p>
        <p><strong>CPF:</strong> {{ cliente.cpf }}</p>
        <p><strong>Telefone:</strong> {{ cliente.telefone }}</p>
        <p><strong>Data de nascimento:</strong> {{ cliente.data_nascimento }}</p>
        <p><strong>CEP:</strong> {{ cliente.cep }}</p>
        <p><strong>Rua/Número:</strong> {{ cliente.ruaNumero }}</p>
        <p><strong>Complemento:</strong> {{ cliente.complemento }}</p>
        <div v-if="cliente.foto">
          <p><strong>Foto:</strong></p>
          <img :src="URL.createObjectURL(cliente.foto)" alt="Foto do cliente" width="150" />
        </div>
      </div>
      <div v-else>
        <p>Nenhum cliente encontrado. Faça o cadastro primeiro.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.perfil {
  max-width: 600px;
  margin: 3rem auto;
  background-color: #04384a50;
  padding: 2rem;
  border-radius: 8px;
  color: white;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

p {
  margin-bottom: 1rem;
}
</style>



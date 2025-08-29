<script setup>
function handleSubmit() {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const cpf = document.getElementById("cpf").value;
  const categoria = document.getElementById("categoria").value;
  const nomeEmpreendedor = document.getElementById("nomeEmpreendedor").value;
  const dataNascimento = document.getElementById("dataNascimento").value;

  console.log("Enviado:", {
    nome,
    telefone,
    cpf,
    categoria,
    nomeEmpreendedor,
    dataNascimento
  });
}
</script>

<template>
  <main>
    <section>
      <div class="quadrado">
        <div class="detalhes">
          <img src="/public/login-icon.png" alt="">
          <h1>Cadastre-se como empreendedor:</h1>
        </div>
        <form @submit.prevent="handleSubmit">
          <ul class="lista">
            <li>
              <label for="nome">Nome da loja:</label>
              <input type="text" id="nome" placeholder="">
            </li>
            <li>
              <label for="endereco">Endereço</label>
              <input type="text" id="telefone" maxlength="15">
            </li>
            <li>
              <label for="cpf">CPF/CNPJ:</label>
              <input type="text" id="cpf">
            </li>
            <li>
              <label for="categoria">Categorias:</label>
              <input type="text" list="listaCategorias" id="categoria">
              <datalist id="listaCategorias">
                <option value="Alimentos" />
                <option value="Roupas" />
                <option value="Artesanatos" />
              </datalist>
            </li>
          </ul>
          <ul class="lista2">
            <li>
              <label for="nomeEmpreendedor">Nome do empreendedor:</label>
              <input type="text" id="nomeEmpreendedor" required>
            </li>
            <li>
              <label for="dataNascimento">Data de nascimento:</label>
              <input type="date" id="dataNascimento" required>
            </li>
            <li>
              <label for="telefone">Telefone</label>
              <input type="tel" id="telefoneEmpreendedor" required>
            </li>
            <li>
              <label for="email">E-mail:</label>
              <input type="email" id="email" v-model="email" required>
            </li>
            <li>
              <label for="logo">Insira sua logo:</label>
              <input type="file" id="logo" name="logo" accept="image/*">
            </li>
          </ul>
          <div class="botao">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
.formas {
  display: flex;
  gap: 20px;
}

.quadrado {
  margin: 5vw auto 5vw auto;
  width: 1400px;
  height: 600px;
  background: #04394A;
  border: #f1f1f1 4px solid;
  justify-content: center;
  align-items: center;
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
  font-size: 1.4rem;
  background-color: #08607C;
  border-radius: 20px;
  padding: 0.6rem 1.5rem;
  text-align: center;
  width: fit-content;
  color: white;
}

form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.lista, .lista2 {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1 1 45%;
  min-width: 280px;
}

.lista li, .lista2 li {
  color: white;
  font-weight: bold;
}
input {
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  padding: 5px 0;
  font-size: 1rem;
}

input:focus {
  border-bottom: 2px solid #0abde3;
}
</style>

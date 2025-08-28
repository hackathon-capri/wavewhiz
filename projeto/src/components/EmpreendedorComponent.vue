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
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="formulario">
        <div class="esquerda">
          <ul class="lista">
            <li>
              <label for="nome">Nome da loja:</label>
              <input type="text" id="nome" placeholder="Nome">
            </li>
            <li>
              <label for="telefone">Telefone:</label>
              <input type="tel" id="telefone" placeholder="(47) 99999-9999" maxlength="15">
            </li>
            <li>
              <label for="cpf">CPF/CNPJ:</label>
              <input type="text" id="cpf" placeholder="CPF/CNPJ">
            </li>
            <li>
              <label for="categoria">Categorias:</label>
              <input type="text" list="listaCategorias" id="categoria" placeholder="Escolha uma categoria">
              <datalist id="listaCategorias">
                <option value="Alimentos" />
                <option value="Roupas" />
                <option value="Artesanatos" />
              </datalist>
            </li>
          </ul>
        </div>
        <div class="direita">
          <ul class="lista2">
            <li>
              <label for="nomeEmpreendedor">Nome do empreendedor:</label>
              <input type="text" id="nomeEmpreendedor" placeholder="Nome">
            </li>
            <li>
              <label for="dataNascimento">Data de nascimento:</label>
              <input type="date" id="dataNascimento">
            </li>
            <li>
              <label for="telefone">Telefone do empreendedor:</label>
              <input type="tel" id="telefoneEmpreendedor" placeholder="Telefone do Empreendedor">
            </li>
            <li>
              <label for="email">E-mail:</label>
              <input type="email" id="email" placeholder="exemplo@email" v-model="email" required>
            </li>
            <li>
              <button type="submit">Enviar</button>
            </li>
          </ul>
        </div>
        <div class="botao">
          <button>+</button>
          <p>Insira sua logo</p>
        </div>
         </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
main {
  font-family: 'Inter', sans-serif;
  background-color: #04394A;
}
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
  display: flex;
  justify-content: center;
  align-items: self-start;
}
.detalhes {
  text-align: center;
  color: white;
  padding: 2vw 0 0 0;
}
.detalhes img {
  padding: 0 0 1.5vw 0;
}
.detalhes h1 {
  padding: 1.5vw 0 0 0;
  font-size: 1.3rem;
  background-color: #08607C;
  border-radius: 60px;
  width: 35vw;
  padding: 1vw 0 1vw 0 ;
  display: flex;
  justify-content: center;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 80px;
  color: #f1f1f1;
  font-family: 'Inter', sans-serif;
  gap: 40px;
}
footer img {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
}
.info {
  display: flex;
  flex-direction: column;
  max-width: 220px;
}
.info p {
  margin: 4px 0;
}
.info a {
  text-decoration: none;
  color: #f1f1f1;
  font-weight: bold;
}

.aba-footer ul,
.categoria-footer ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}
.socialmedia {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 28px;
}

.socialmedia span {
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.formulario {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  
 
}

.botao {
  width: 160px;
  text-align: center;
  color: #FFFFFF;
  font-size: larger;
}

.esquerda{
  margin: 0 5vw 0 20vw;
  color: #FFFFFF;
  font-size: 25px;
}

.direita{
  margin: 0 5vw 0 0vw;
  color: #FFFFFF;
  font-size: 25px;
}

.lista{
  list-style: none;
}
.lista2{
  list-style: none;
}
</style>

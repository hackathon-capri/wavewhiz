<script setup>
function handleSubmit() {
  const nome = document.getElementById('nome').value
  const endereco = document.getElementById('endereco').value
  const cpf = document.getElementById('cpf').value
  const dataNascimento = document.getElementById('dataNascimento').value
  const email = document.getElementById('email').value
  const ruaNumero = document.getElementById('ruaNumero').value
  const complemento = document.getElementById('complemento').value

  console.log('Enviado:', {
    nome,
    endereco,
    cpf,
    dataNascimento,
    email,
    ruaNumero,
    complemento,
  })
}
</script>

<template>
  <main>
    <section>
      <div class="quadrado">
        <div class="detalhes">
          <img src="/public/login-icon.png" alt="Ícone de login" />
          <h1>Cadastre-se como cliente:</h1>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="formulario">
            <ul class="lista">
              <li>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" required />
              </li>
              <li>
                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" maxlength="100" required />
              </li>
              <li>
                <label for="cpf">CPF/CNPJ:</label>
                <input type="text" id="cpf" required />
              </li>
              <li>
                <label for="email">E-mail:</label>
                <input type="email" id="email" required />
              </li>
            </ul>

            <ul class="lista2">
              <li>
                <label for="dataNascimento">Data de nascimento:</label>
                <input type="date" id="dataNascimento" required />
              </li>
              <li>
                <label for="cpf">CEP:</label>
                <input type="text" id="cep" required />
              </li>
              <li>
                <label for="cpf">Rua/Número:</label>
                <input type="text" id="ruaNumero" required />
              </li>
              <li>
                <label for="cpf">Complemento:</label>
                <input type="text" id="completo" required />
              </li>
            </ul>

            <div class="lado-direito">
              <label for="logo" class="upload-logo">+</label>
              <p>Insira sua logo:</p>
              <input type="file" id="logo" name="logo" accept="image/*" style="display: none" />
            </div>
          </div>

          <div class="botoes">
            <button type="submit">Enviar</button>
            <button type="reset">Limpar</button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
.quadrado {
  margin: 5vw auto;
  width: 1400px;
  min-height: 600px;
  background: #04394a;
  border: #f1f1f1 4px solid;
  padding: 2rem;
  box-sizing: border-box;
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
  background-color: #08607c;
  border-radius: 20px;
  padding: 0.6rem 1.5rem;
  text-align: center;
  width: fit-content;
  color: white;
}

form {
  width: 100%;
}

.formulario {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.lista,
.lista2 {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1 1 35%;
  min-width: 280px;
}

.lista li,
.lista2 li {
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}

.lado-direito {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1 1 20%;
  min-width: 160px;
  color: white;
  text-align: center;
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
  background-color: #08607c;
  color: white;
  border: none;
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.upload-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #08607c;
  color: white;
  font-weight: bold;
  padding: 1rem;
  border-radius: 10px;
  width: 120px;
  height: 80px;
  cursor: pointer;
  text-align: center;
  font-size: 2rem;
}
</style>

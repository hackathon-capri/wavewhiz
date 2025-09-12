<script setup>
function handleSubmit() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefoneEmpreendedor").value;
  const cpf = document.getElementById("cpf").value;
  const categoria = document.getElementById("categoria").value;
  const nomeEmpreendedor = document.getElementById("nomeEmpreendedor").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const email = document.getElementById("email").value;

  console.log("Enviado:", {
    nome,
    endereco,
    telefone,
    cpf,
    categoria,
    nomeEmpreendedor,
    dataNascimento,
    email
  });
}
</script>

<template>
  <main>
    <section>
      <div class="quadrado">
        <div class="detalhes">
          <img src="/public/login-icon.png" alt="Ícone de login" />
          <h1>Cadastre-se como empreendedor:</h1>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="formulario">
            <ul class="lista">
              <li>
                <label for="nome">Nome da loja:</label>
                <input type="text" id="nome" required>
              </li>
              <li>
                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" maxlength="100" required>
              </li>
              <li>
                <label for="cpf">CPF/CNPJ:</label>
                <input type="text" id="cpf" required>
              </li>
              <li>
                <label for="categoria">Categorias:</label>
                <input type="text" list="listaCategorias" id="categoria" required>
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
                <label for="telefoneEmpreendedor">Telefone:</label>
                <input type="tel" id="telefoneEmpreendedor" required>
              </li>
              <li>
                <label for="email">E-mail:</label>
                <input type="email" id="email" required>
              </li>
            </ul>

            <div class="lado-direito">
              <label for="logo" class="upload-logo">+</label>
              <p>Insira sua logo:</p>
              <input type="file" id="logo" name="logo" accept="image/*" style="display: none;">
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
  width: 1300px;
  min-height: 600px;
  background: #04384aa6;
  border-radius: 20px;
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
  height: 60px;
  margin-bottom: 1rem;
}

.detalhes h1 {
  font-size: 1.4rem;
  background-color: #04394A;
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

.lista, .lista2 {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1 1 35%;
  min-width: 280px;
}

.lista li, .lista2 li {
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
  background-color: #04394A;
  color: white;
  border: none;
  padding: 15px 35px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
}

.botoes button:hover {
  background-color: #08607C;
  transition: 0.3s;
}

.upload-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #08607C;
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

/*---------->RESPONSIVIDADE<----------*/
@media (max-width: 768px) {
  .quadrado {
    width: 90vw;
    height: 100%;
    padding: 1rem;
  }

  .formulario {
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
  }

  .lista, .lista2, .lado-direito {
    flex: 1 1 100%;
    min-width: unset;
  }

  .botoes {
    flex-direction: column;
    gap: 0.8rem;
  }

  .botoes button {
    width: 100%;
  }

  .upload-logo {
    width: 30%;
    height: 60px;
    font-size: 1.5rem;
  }
}

</style>

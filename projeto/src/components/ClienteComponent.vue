<script setup>
import { reactive } from "vue";
import api from "@/api";

const form = reactive({
  nome: "",
  email: "",
  password: "",
  cpf: "",
  telefone: "",
  data_nascimento: "",
  role: "cliente", // default para cadastro de cliente
  endereco: "",
  cep: "",
  ruaNumero: "",
  complemento: "",
  foto: null
});

// Formata CPF: 000.000.000-00
function formatCPF(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  }

  form.cpf = value;
}

// Formata telefone: (XX) XXXXX-XXXX
function formatTelefone(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  }

  form.telefone = value;
}

function handleFileChange(event) {
  form.foto = event.target.files[0];
}

function resetForm() {
  for (const key in form) {
    if (key === "role") {
      form[key] = "cliente";
    } else {
      form[key] = "";
    }
  }
  form.foto = null;
}

function validateForm() {
  const errors = [];
  if (!form.nome) errors.push("Nome é obrigatório");
  if (!form.email) errors.push("Email é obrigatório");
  if (!form.password) errors.push("Senha é obrigatória");
  if (!form.cpf || form.cpf.replace(/\D/g, "").length !== 11)
    errors.push("CPF inválido");
  if (!form.telefone) errors.push("Telefone é obrigatório");
  if (!form.data_nascimento) errors.push("Data de nascimento é obrigatória");
  return errors;
}

async function handleSubmit() {
  const errors = validateForm();
  if (errors.length) {
    alert(errors.join("\n"));
    return;
  }

  try {
    const formData = new FormData();
    for (const key in form) {
      let value = form[key];
      // envia CPF apenas números
      if (key === "cpf") value = value.replace(/\D/g, "");
      if (value !== null) formData.append(key, value);
    }
    await api.post("usuarios/", formData);

    alert("Cadastro feito com sucesso!");
    resetForm();
  } catch (error) {
    console.error(error.response?.data || error);
    alert("Erro ao cadastrar, verifique os dados.");
  }
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
              <input type="text" id="nome" v-model="form.nome" required />
            </li>
            <li>
              <label for="email">E-mail:</label>
              <input type="email" id="email" v-model="form.email" required />
            </li>
            <li>
              <label for="password">Senha:</label>
              <input type="password" id="senha" v-model="form.password" required minlength="6" maxlength="50" />
            </li>
            <li>
              <label for="cpf">CPF:</label>
              <input type="text" id="cpf" v-model="form.cpf" @input="formatCPF" placeholder="000.000.000-00" required />
            </li>
            <li>
              <label for="telefone">Telefone:</label>
              <input type="text" id="telefone" v-model="form.telefone" @input="formatTelefone" placeholder="(00) 00000-0000" required />
            </li>
          </ul>

          <ul class="lista2">
            <li>
              <label for="data_nascimento">Data de nascimento:</label>
              <input type="date" id="data_nascimento" v-model="form.data_nascimento" required />
            </li>
            <li>
              <label for="cep">CEP:</label>
              <input type="text" id="cep" v-model="form.cep" />
            </li>
            <li>
              <label for="ruaNumero">Rua/Número:</label>
              <input type="text" id="ruaNumero" v-model="form.ruaNumero" />
            </li>
            <li>
              <label for="complemento">Complemento:</label>
              <input type="text" id="complemento" v-model="form.complemento" />
            </li>
          </ul>

          <div class="lado-direito">
            <label for="foto" class="upload-foto">+</label>
            <p>Insira sua foto:</p>
            <input type="file" id="foto" @change="handleFileChange" accept="image/*" style="display: none" />
          </div>
        </div>

        <div class="botoes">
          <button type="submit">Enviar</button>
          <button type="button" @click="resetForm">Limpar</button>
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
  background: #04384a50;
  border: #f1f1f149 4px solid;
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

.upload-foto {
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

<script setup>
import { reactive } from "vue";
import api from "@/api";
import router from "@/router";

const form = reactive({
  nome: "",
  descricao: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  cpf_cnpj: "",
  imagem: null,
  categorias: []
});

const errors = reactive({});
const categorias = reactive([]);

// Fetch categorias on mount
import { onMounted } from "vue";
onMounted(async () => {
  try {
    const res = await api.get('/categorias/');
    categorias.splice(0, categorias.length, ...res.data);
  } catch (err) {
    console.error('Erro ao buscar categorias:', err);
  }
});

// Formata CEP: 00000-000
function formatCEP(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 8) value = value.slice(0, 8);
  if (value.length > 5) {
    value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  }
  form.cep = value;
}

// Formata CPF/CNPJ
function formatCPFCNPJ(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 14) value = value.slice(0, 14);
  if (value.length > 12) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, "$1.$2.$3/$4-$5");
  } else if (value.length > 11) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})/, "$1.");
  }
  form.cpf_cnpj = value;
}

function resetForm() {
  for (const key in form) {
    if (key === "categorias") {
      form[key] = [];
    } else {
      form[key] = "";
    }
  }
  form.imagem = null;
}

function validateForm() {
  for (const k in errors) delete errors[k];

  if (!form.nome || !form.nome.trim()) errors.nome = ['Nome é obrigatório'];
  if (!form.descricao || !form.descricao.trim()) errors.descricao = ['Descrição é obrigatória'];
  if (!form.cep || form.cep.replace(/\D/g, '').length !== 8) errors.cep = ['CEP inválido'];
  if (!form.rua || !form.rua.trim()) errors.rua = ['Rua é obrigatória'];
  if (!form.numero || !form.numero.trim()) errors.numero = ['Número é obrigatório'];
  const cpfCnpjDigits = form.cpf_cnpj ? form.cpf_cnpj.replace(/\D/g, '') : '';
  if (!cpfCnpjDigits || (cpfCnpjDigits.length !== 11 && cpfCnpjDigits.length !== 14)) errors.cpf_cnpj = ['CPF/CNPJ inválido'];
  if (!form.categorias || form.categorias.length === 0) errors.categorias = ['Selecione pelo menos uma categoria'];

  return Object.keys(errors).length === 0;
}

async function handleSubmit() {
  const ok = validateForm();
  if (!ok) return;

  try {
    const formData = new FormData();
    for (const key in form) {
      let value = form[key];
      if (key === "cep" && typeof value === "string") value = value.replace(/\D/g, "");
      if (key === "cpf_cnpj" && typeof value === "string") value = value.replace(/\D/g, "");
      if (key === "categorias") {
        form.categorias.forEach(id => formData.append('categorias', id));
      } else if (value !== null && value !== "") {
        formData.append(key, value);
      }
    }

    await api.post('/lojas/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    window.alert('Loja cadastrada com sucesso!');
    resetForm();
    router.push('/perfil-empreendedor');
  } catch (error) {
    console.error('Cadastro error:', error.response?.data || error);
    const resp = error.response?.data;
    if (resp && typeof resp === 'object') {
      for (const k in resp) {
        errors[k] = resp[k];
      }
      const summary = resp.non_field_errors || resp.detail || null;
      if (summary) window.alert(String(summary));
    } else {
      window.alert('Erro ao cadastrar loja, verifique os dados.');
    }
  }
}
</script>

<template>
<main>
  <section>
    <div class="quadrado">
      <div class="detalhes">
        <img src="/login-icon.png" alt="Ícone de loja" />
        <h1>Cadastre sua loja:</h1>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="formulario">
          <ul class="lista">
            <li>
              <label for="nome">Nome da loja:</label>
              <input type="text" id="nome" v-model="form.nome" required />
              <div v-if="errors.nome" style="color:#f66">{{ errors.nome.join ? errors.nome.join(', ') : errors.nome }}</div>
            </li>
            <li>
              <label for="descricao">Descrição:</label>
              <textarea id="descricao" v-model="form.descricao" required></textarea>
              <div v-if="errors.descricao" style="color:#f66">{{ errors.descricao.join ? errors.descricao.join(', ') : errors.descricao }}</div>
            </li>
            <li>
              <label for="cep">CEP:</label>
              <input type="text" id="cep" v-model="form.cep" @input="formatCEP" required maxlength="9" />
              <div v-if="errors.cep" style="color:#f66">{{ errors.cep.join ? errors.cep.join(', ') : errors.cep }}</div>
            </li>
            <li>
              <label for="rua">Rua:</label>
              <input type="text" id="rua" v-model="form.rua" required />
              <div v-if="errors.rua" style="color:#f66">{{ errors.rua.join ? errors.rua.join(', ') : errors.rua }}</div>
            </li>
          </ul>

          <ul class="lista2">
            <li>
              <label for="numero">Número:</label>
              <input type="text" id="numero" v-model="form.numero" required />
              <div v-if="errors.numero" style="color:#f66">{{ errors.numero.join ? errors.numero.join(', ') : errors.numero }}</div>
            </li>
            <li>
              <label for="complemento">Complemento:</label>
              <input type="text" id="complemento" v-model="form.complemento" />
            </li>
            <li>
              <label for="cpf_cnpj">CPF/CNPJ:</label>
              <input type="text" id="cpf_cnpj" v-model="form.cpf_cnpj" @input="formatCPFCNPJ" required maxlength="18" />
              <div v-if="errors.cpf_cnpj" style="color:#f66">{{ errors.cpf_cnpj.join ? errors.cpf_cnpj.join(', ') : errors.cpf_cnpj }}</div>
            </li>
            <li>
              <label for="imagem">Imagem da loja:</label>
              <input type="file" id="imagem" @change="form.imagem = $event.target.files[0]" accept="image/*" />
            </li>
            <li>
              <label for="categorias">Categorias:</label>
              <select multiple v-model="form.categorias">
                <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
              </select>
              <div v-if="errors.categorias" style="color:#f66">{{ errors.categorias.join ? errors.categorias.join(', ') : errors.categorias }}</div>
            </li>
          </ul>
        </div>

        <div class="botoes">
          <button type="submit">Cadastrar Loja</button>
          <button type="button" @click="resetForm">Limpar</button>
        </div>
      </form>
    </div>
  </section>
</main>
</template>

<style scoped>
/* Same as ClienteComponent.vue, with adjustments for store fields */
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
  align-items: flex-start;
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
  display: flex;
  flex-direction: column;
}

input, select, textarea {
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  padding: 5px 0;
  font-size: 1rem;
  color: white;
}

textarea {
  resize: vertical;
  min-height: 60px;
}

input:focus, select:focus, textarea:focus {
  border-bottom: 2px solid #0abde3;
  outline: none;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

select option {
  background: #04394A;
  color: white;
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

/* Responsividade similar */
@media (max-width: 1366px) {
  .quadrado {
    width: 90%;
    height: auto;
    padding: 5vw 2vw;
  }

  .detalhes h1 {
    font-size: 1.3rem;
    padding: 0.5rem 1.2rem;
  }

  .formulario {
    gap: 1.5rem;
  }

  .lista, .lista2 {
    gap: 1rem;
  }

  input, select, textarea {
    font-size: 0.95rem;
  }

  .botoes button {
    padding: 12px 30px;
    font-size: 1.1rem;
  }
}

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

  .lista, .lista2 {
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
}
</style>
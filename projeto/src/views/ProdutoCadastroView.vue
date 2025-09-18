<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductsStore } from "@/api/produtos.js";

const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();

const form = reactive({
  nome: "",
  preco: "",
  descricao: "",
  estoque: "",
  imagem: null,
  loja: route.params.id // Set loja from route param
});

const errors = reactive({});

// Formata preço: 00.00
function formatPreco(e) {
  let value = e.target.value.replace(/[^\d,]/g, "");
  if (value.includes(',')) {
    const parts = value.split(',');
    if (parts[1].length > 2) parts[1] = parts[1].slice(0, 2);
    value = parts[0] + ',' + parts[1];
  }
  form.preco = value;
}

function resetForm() {
  form.nome = "";
  form.preco = "";
  form.descricao = "";
  form.estoque = "";
  form.imagem = null;
}

function validateForm() {
  for (const k in errors) delete errors[k];

  if (!form.nome || !form.nome.trim()) errors.nome = ['Nome é obrigatório'];
  if (!form.preco || !form.preco.trim()) errors.preco = ['Preço é obrigatório'];
  if (!form.descricao || !form.descricao.trim()) errors.descricao = ['Descrição é obrigatória'];
  if (!form.estoque || form.estoque <= 0) errors.estoque = ['Quantidade deve ser maior que 0'];

  return Object.keys(errors).length === 0;
}

async function handleSubmit() {
  const ok = validateForm();
  if (!ok) return;

  try {
    const formData = new FormData();
    for (const key in form) {
      let value = form[key];
      if (key === "preco" && typeof value === "string") {
        // Convert comma to dot for backend
        value = value.replace(',', '.');
      }
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    }

    await productsStore.createProduct(formData);

    window.alert('Produto cadastrado com sucesso!');
    resetForm();
    router.push(`/loja/${route.params.id}`);
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
      window.alert('Erro ao cadastrar produto, verifique os dados.');
    }
  }
}
</script>

<template>
<main>
  <section>
    <div class="quadrado">
      <div class="detalhes">
        <img src="/login-icon.png" alt="Ícone de produto" />
        <h1>Cadastre seu produto:</h1>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="formulario">
          <ul class="lista">
            <li>
              <label for="nome">Nome do produto:</label>
              <input type="text" id="nome" v-model="form.nome" required />
              <div v-if="errors.nome" style="color:#f66">{{ errors.nome.join ? errors.nome.join(', ') : errors.nome }}</div>
            </li>
            <li>
              <label for="preco">Preço:</label>
              <input type="text" id="preco" v-model="form.preco" @input="formatPreco" required placeholder="0,00" />
              <div v-if="errors.preco" style="color:#f66">{{ errors.preco.join ? errors.preco.join(', ') : errors.preco }}</div>
            </li>
            <li>
              <label for="descricao">Descrição:</label>
              <textarea id="descricao" v-model="form.descricao" required></textarea>
              <div v-if="errors.descricao" style="color:#f66">{{ errors.descricao.join ? errors.descricao.join(', ') : errors.descricao }}</div>
            </li>
            <li>
              <label for="estoque">Quantidade em Estoque:</label>
              <input type="number" id="estoque" v-model.number="form.estoque" required min="1" placeholder="0" />
              <div v-if="errors.estoque" style="color:#f66">{{ errors.estoque.join ? errors.estoque.join(', ') : errors.estoque }}</div>
            </li>
            <li>
              <label for="imagem">Imagem do produto:</label>
              <input type="file" id="imagem" @change="form.imagem = $event.target.files[0]" accept="image/*" />
            </li>
          </ul>
        </div>

        <div class="botoes">
          <button type="submit">Cadastrar Produto</button>
          <button type="button" @click="resetForm">Limpar</button>
        </div>
      </form>
    </div>
  </section>
</main>
</template>

<style scoped>
/* Similar to LojaCadastroView.vue */
.quadrado {
  margin: 5vw auto;
  width: 800px;
  min-height: 500px;
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
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.lista {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  flex: 1 1 100%;
  min-width: 280px;
}

.lista li {
  color: white;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}

input, textarea {
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  padding: 5px 0;
  font-size: 1rem;
  color: white;
}

input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

input:focus, textarea:focus {
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

/* Responsividade */
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

  .lista {
    gap: 1rem;
  }

  input, textarea {
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

  .botoes {
    flex-direction: column;
    gap: 0.8rem;
  }

  .botoes button {
    width: 100%;
  }
}
</style>
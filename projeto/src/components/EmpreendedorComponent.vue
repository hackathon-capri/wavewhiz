<script setup>
import { reactive } from 'vue';
import api from '@/api';

const form = reactive({
  nome: '',
  email: '',
  cpf: '',
  telefone: '',
  data_nascimento: '',
  password: '',
  role: 'empreendedor'
});

const errors = reactive({});

// Formata CPF: 000.000.000-00
function formatCPF(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }

  form.cpf = value;
}

function formatTelefone(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);
  if (value.length > 6) {
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  }
  form.telefone = value;
}

function resetForm() {
  for (const k in form) {
    if (k === 'role') form[k] = 'empreendedor';
    else form[k] = '';
  }
  for (const k in errors) delete errors[k];
}

function validateForm() {
  for (const k in errors) delete errors[k];
  if (!form.nome || !form.nome.trim()) errors.nome = ['Nome é obrigatório'];
  if (!form.email || !form.email.trim()) errors.email = ['Email é obrigatório'];
  if (!form.password) errors.password = ['Senha é obrigatória'];
  const cpfDigits = form.cpf ? form.cpf.replace(/\D/g, '') : '';
  if (!cpfDigits || cpfDigits.length !== 11) errors.cpf = ['CPF inválido'];
  if (!form.telefone || !form.telefone.replace(/\D/g, '').length) errors.telefone = ['Telefone é obrigatório'];
  if (!form.data_nascimento) errors.data_nascimento = ['Data de nascimento é obrigatória'];
  return Object.keys(errors).length === 0;
}

async function handleSubmit() {
  const ok = validateForm();
  if (!ok) return;

  try {
    const fd = new FormData();
    for (const k in form) {
      let v = form[k];
      if (k === 'cpf' && typeof v === 'string') v = v.replace(/\D/g, '');
      if (k === 'telefone' && typeof v === 'string') v = v.replace(/\D/g, '');
      if (v !== null && v !== '') fd.append(k, v);
    }

    await api.post('/usuarios/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    window.alert('Cadastro de empreendedor enviado com sucesso!');
    resetForm();
  } catch (err) {
    const resp = err.response?.data;
    if (resp && typeof resp === 'object') {
      for (const k in resp) errors[k] = resp[k];
      const summary = resp.non_field_errors || resp.detail || null;
      if (summary) window.alert(String(summary));
    } else {
      window.alert('Erro ao cadastrar empreendedor.');
    }
  }
}
</script>

<template>
  <main>
    <section>
      <div class="quadrado">
        <div class="detalhes">
          <img src="/login-icon.png" alt="Ícone de login" />
          <h1>Cadastre-se como empreendedor:</h1>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="formulario">
            <ul class="lista">
              <li>
                <label for="nome">Nome completo:</label>
                <input type="text" id="nome" v-model="form.nome" required />
                <div v-if="errors.nome" style="color:#f66">{{ errors.nome.join ? errors.nome.join(', ') : errors.nome }}</div>
              </li>
              <li>
                <label for="email">E-mail:</label>
                <input type="email" id="email" v-model="form.email" required />
                <div v-if="errors.email" style="color:#f66">{{ errors.email.join ? errors.email.join(', ') : errors.email }}</div>
              </li>
              <li>
                <label for="password">Senha:</label>
                <input type="password" id="password" v-model="form.password" required minlength="6" maxlength="50" />
                <div v-if="errors.password" style="color:#f66">{{ errors.password.join ? errors.password.join(', ') : errors.password }}</div>
              </li>
              <li>
                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" v-model="form.cpf" @input="formatCPF" required maxlength="14" inputmode="numeric" />
                <div v-if="errors.cpf" style="color:#f66">{{ errors.cpf.join ? errors.cpf.join(', ') : errors.cpf }}</div>
              </li>
            </ul>

            <ul class="lista2">
              <li>
                <label for  ="telefone">Telefone:</label>
                <input type="tel" id="telefone" v-model="form.telefone" @input="formatTelefone" required maxlength="15" inputmode="tel" />
                <div v-if="errors.telefone" style="color:#f66">{{ errors.telefone.join ? errors.telefone.join(', ') : errors.telefone }}</div>
              </li>
              <li>
                <label for="dataNascimento">Data de nascimento:</label>
                <input type="date" id="dataNascimento" v-model="form.data_nascimento" required />
                <div v-if="errors.data_nascimento" style="color:#f66">{{ errors.data_nascimento.join ? errors.data_nascimento.join(', ') : errors.data_nascimento }}</div>
              </li>
            </ul>
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

input, select {
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  padding: 5px 0;
  font-size: 1rem;
  color: white;
}

input:focus, select:focus {
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

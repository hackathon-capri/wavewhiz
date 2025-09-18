<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLojasStore } from '../api/lojas.js';
import { useProductsStore } from '../api/produtos.js';
import { useCartStore } from '../stores/cart.js';
import api from '../api.js';

const route = useRoute();
const router = useRouter();
const lojaId = route.params.id;
const loja = ref(null);
const produtosStore = useProductsStore();
const lojasStore = useLojasStore();
const cartStore = useCartStore();

// Modal para editar produto
const showEditProductModal = ref(false);
const editingProduct = ref(null);

// Modal para editar loja
const showEditLojaModal = ref(false);

// Modal para adicionar ao carrinho
const showAddToCartModal = ref(false);
const selectedProduct = ref(null);
const selectedQuantity = ref(1);

const user = computed(() => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
});

const isOwner = computed(() => {
  return loja.value && user.value.id == loja.value.empreendedor;
});

const isClient = computed(() => {
  return user.value.role === 'cliente';
});

onMounted(async () => {
  loja.value = await lojasStore.fetchLojaById(lojaId);
  await produtosStore.fetchProducts(lojaId);
});

// Funções para o modal de adicionar ao carrinho
const openAddToCartModal = (produto) => {

  selectedProduct.value = produto;
  selectedQuantity.value = 1;
  showAddToCartModal.value = true;
};

const closeAddToCartModal = () => {
  showAddToCartModal.value = false;
  selectedProduct.value = null;
  selectedQuantity.value = 1;
};

const incrementQuantity = () => {

  const maxQuantity = Number(selectedProduct.value?.quantidade_disponivel) || 999;

  if (selectedProduct.value && selectedQuantity.value < maxQuantity) {
    selectedQuantity.value++;

  } else {

  }
};

const decrementQuantity = () => {
  if (selectedQuantity.value > 1) {
    selectedQuantity.value--;
  }
};

const addToCart = async () => {
  if (selectedProduct.value) {
    await cartStore.addToCart(selectedProduct.value, selectedQuantity.value);
    closeAddToCartModal();
  }
};

// Funções para editar produto
const openEditProductModal = (produto) => {
  editingProduct.value = { ...produto };
  showEditProductModal.value = true;
};

const closeEditProductModal = () => {
  showEditProductModal.value = false;
  editingProduct.value = null;
};

const saveEditedProduct = async () => {
  if (!editingProduct.value) return;

  try {
    const formData = new FormData();

    // Campos editáveis do produto
    const editableFields = [
      'nome',
      'preco',
      'descricao',
      'quantidade_disponivel'
    ];

    // Adicionar apenas campos editáveis
    editableFields.forEach(key => {
      let value = editingProduct.value[key];
      if (key === "preco" && typeof value === "string") {
        value = value.replace(',', '.');
      }
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    // Tratamento especial para imagem - só adiciona se for um novo arquivo
    if (editingProduct.value.imagem && editingProduct.value.imagem instanceof File) {
      formData.append('imagem', editingProduct.value.imagem);
    }

    await api.patch(`/produtos/${editingProduct.value.id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // Recarregar produtos
    await produtosStore.fetchProducts(lojaId);
    closeEditProductModal();
    alert('Produto atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    alert('Erro ao atualizar produto. Tente novamente.');
  }
};

// Formatação de CEP para o modal de edição
const formatCEP = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 8) value = value.slice(0, 8);
  if (value.length > 5) {
    value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  }
  loja.value.cep = value;
};

// Funções para editar loja
const openEditLojaModal = () => {
  showEditLojaModal.value = true;
};

const closeEditLojaModal = () => {
  showEditLojaModal.value = false;
};

const saveEditedLoja = async () => {
  if (!loja.value) return;

  try {
    const formData = new FormData();

    // Campos editáveis da loja (baseado na documentação da API)
    const editableFields = [
      'nome',
      'descricao',
      'cep',
      'rua',
      'numero',
      'complemento',
      'cpf_cnpj'
    ];

    // Adicionar apenas campos editáveis
    editableFields.forEach(key => {
      let value = loja.value[key];

      // Tratamento especial para campos específicos
      if (key === "cep" && typeof value === "string") {
        value = value.replace(/\D/g, ""); // Remove formatação
      }
      if (key === "cpf_cnpj" && typeof value === "string") {
        value = value.replace(/\D/g, ""); // Remove formatação
      }

      // Só adiciona se o valor não for null/undefined/vazio
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    // Tratamento especial para imagem - só adiciona se for um novo arquivo
    if (loja.value.imagem && loja.value.imagem instanceof File) {
      formData.append('imagem', loja.value.imagem);
    }

    // Tratamento especial para categorias (se existir)
    if (loja.value.categorias && Array.isArray(loja.value.categorias)) {
      loja.value.categorias.forEach(categoriaId => {
        formData.append('categorias', categoriaId);
      });
    }


    for (let [key, value] of formData.entries()) {

    }

    const response = await api.patch(`/lojas/${loja.value.id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });



    // Recarregar loja
    loja.value = await lojasStore.fetchLojaById(lojaId);
    closeEditLojaModal();
    alert('Loja atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar loja:', error);
    console.error('Detalhes do erro:', error.response?.data);

    // Mostrar erro mais específico
    if (error.response?.data) {
      const errorData = error.response.data;
      if (typeof errorData === 'object') {
        const errorMessages = Object.entries(errorData)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('\n');
        alert(`Erro ao atualizar loja:\n${errorMessages}`);
      } else {
        alert(`Erro ao atualizar loja: ${errorData}`);
      }
    } else {
      alert('Erro ao atualizar loja. Verifique os dados e tente novamente.');
    }
  }
};
</script>
<template>
  <div class="loja-view">
    <div v-if="lojasStore.loading || produtosStore.loading">Carregando...</div>
    <div v-if="lojasStore.error || produtosStore.error">Erro: {{ lojasStore.error || produtosStore.error }}</div>
    <div v-if="loja" class="introducaoLoja">
      <div class="loja-header">
        <div class="loja-imagem-container">
          <img :src="loja.imagem || '/placeholder.jpg'" :alt="loja.nome" class="loja-imagem" />
        </div>
        <div class="loja-info">
          <h1>{{ loja.nome }}</h1>
          <hr />
          <p>{{ loja.descricao }}</p>
          <p>Endereço: {{ loja.rua }}, {{ loja.numero }}, {{ loja.complemento }}, {{ loja.cep }}</p>
        </div>
      </div>
      <div v-if="isOwner" class="owner-actions">
        <button @click="router.push(`/loja/${lojaId}/cadastrar-produto`)" class="cadastrar-btn">Cadastrar Produto</button>
        <button @click="openEditLojaModal" class="editar-loja-btn">Editar Loja</button>
      </div>
    </div>
    <div class="produtosdabigbig">
      <div class="produtos-list">
        <div v-for="produto in produtosStore.products" :key="produto.id" class="produto-item" :class="{ 'owner-product': isOwner }" @click="isOwner ? openEditProductModal(produto) : null">
          <img :src="produto.imagem || '/placeholder.jpg'" :alt="produto.nome" />
          <h2>{{ produto.nome }}</h2>
          <p>R$ {{ produto.preco }}</p>
          <p v-if="produto.quantidade_disponivel !== undefined" class="quantidade-disponivel">
            Disponível: {{ produto.quantidade_disponivel }}
          </p>
          <div v-if="isClient && !isOwner" class="cliente-actions">
            <button @click.stop="openAddToCartModal(produto)" class="add-to-cart-btn">
              Adicionar ao Carrinho
            </button>
          </div>
          <div v-if="isOwner" class="owner-product-actions">
            <span class="edit-hint">Clique para editar</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para adicionar ao carrinho -->
    <div v-if="showAddToCartModal" class="modal-overlay" @click="closeAddToCartModal">
      <div class="modal-content" @click.stop>
        <h3>Adicionar ao Carrinho</h3>
        <div v-if="selectedProduct" class="product-info">
          <img :src="selectedProduct.imagem || '/placeholder.jpg'" :alt="selectedProduct.nome" />
          <h4>{{ selectedProduct.nome }}</h4>
          <p>R$ {{ selectedProduct.preco }}</p>
          <p>Disponível: {{ selectedProduct.quantidade_disponivel }}</p>
        </div>

        <div class="quantity-selector">
          <label>Quantidade:</label>
          <div class="quantity-controls">
            <button @click="decrementQuantity" :disabled="selectedQuantity <= 1">-</button>
            <span>{{ selectedQuantity }}</span>
            <button @click="incrementQuantity" :disabled="selectedProduct && selectedQuantity >= Number(selectedProduct.quantidade_disponivel || 999)">+</button>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="closeAddToCartModal" class="cancel-btn">Cancelar</button>
          <button @click="addToCart" class="confirm-btn" :disabled="cartStore.loading">
            {{ cartStore.loading ? 'Adicionando...' : 'Adicionar ao Carrinho' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para editar produto -->
    <div v-if="showEditProductModal" class="modal-overlay" @click="closeEditProductModal">
      <div class="modal-content edit-modal" @click.stop>
        <h3>Editar Produto</h3>
        <form @submit.prevent="saveEditedProduct">
          <div class="form-group">
            <label for="edit-nome">Nome do produto:</label>
            <input type="text" id="edit-nome" v-model="editingProduct.nome" required />
          </div>

          <div class="form-group">
            <label for="edit-preco">Preço:</label>
            <input type="text" id="edit-preco" v-model="editingProduct.preco" required placeholder="0,00" />
          </div>

          <div class="form-group">
            <label for="edit-descricao">Descrição:</label>
            <textarea id="edit-descricao" v-model="editingProduct.descricao" required></textarea>
          </div>

          <div class="form-group">
            <label for="edit-quantidade">Quantidade em Estoque:</label>
            <input type="number" id="edit-quantidade" v-model.number="editingProduct.quantidade_disponivel" required min="0" />
          </div>

          <div class="form-group">
            <label for="edit-imagem">Nova imagem (opcional):</label>
            <input type="file" id="edit-imagem" @change="editingProduct.imagem = $event.target.files[0]" accept="image/*" />
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeEditProductModal" class="cancel-btn">Cancelar</button>
            <button type="submit" class="confirm-btn">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para editar loja -->
    <div v-if="showEditLojaModal" class="modal-overlay" @click="closeEditLojaModal">
      <div class="modal-content edit-modal" @click.stop>
        <h3>Editar Loja</h3>
        <form @submit.prevent="saveEditedLoja">
          <div class="form-group">
            <label for="edit-loja-nome">Nome da loja:</label>
            <input type="text" id="edit-loja-nome" v-model="loja.nome" required />
          </div>

          <div class="form-group">
            <label for="edit-loja-descricao">Descrição:</label>
            <textarea id="edit-loja-descricao" v-model="loja.descricao" required></textarea>
          </div>

          <div class="form-group">
            <label for="edit-loja-cep">CEP:</label>
            <input type="text" id="edit-loja-cep" v-model="loja.cep" @input="formatCEP" required maxlength="9" />
          </div>

          <div class="form-group">
            <label for="edit-loja-rua">Rua:</label>
            <input type="text" id="edit-loja-rua" v-model="loja.rua" required />
          </div>

          <div class="form-group">
            <label for="edit-loja-numero">Número:</label>
            <input type="text" id="edit-loja-numero" v-model="loja.numero" required />
          </div>

          <div class="form-group">
            <label for="edit-loja-complemento">Complemento:</label>
            <input type="text" id="edit-loja-complemento" v-model="loja.complemento" />
          </div>

          <div class="form-group">
            <label for="edit-loja-imagem">Nova imagem (opcional):</label>
            <input type="file" id="edit-loja-imagem" @change="loja.imagem = $event.target.files[0]" accept="image/*" />
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeEditLojaModal" class="cancel-btn">Cancelar</button>
            <button type="submit" class="confirm-btn">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.loja-view {
  width: 100%;
}
div.introducaoLoja {
  margin-left: 15px;
}

.loja-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.loja-imagem-container {
  flex-shrink: 0;
}

.loja-imagem {
  width: 150px;
  height: 150px;
  border-radius: 15px;
  object-fit: cover;
  border: 3px solid #08607C;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loja-info {
  flex: 1;
}

div.introducaoLoja h1 {
  color: white;
  font-family: 'Playfair Display', serif;
  margin-top: 0;
  margin-bottom: 10px;
}

hr {
  border: none;
  height: 1.5px;
  background-color: white;
  width: 50%;
  margin: 10px 0;
}
div.introducaoLoja p {
  color: white;
  margin: 8px 0;
  width: 50%;
}
.owner-actions {
  margin-top: 1rem;
}
.cadastrar-btn {
  background-color: #08607C;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.cadastrar-btn:hover {
  background-color: #0e98c2;
}
.editar-loja-btn {
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 10px;
}
.editar-loja-btn:hover {
  background-color: #138496;
}
.produtos-list {
  display: flex;
  margin-top: 3vw;
  margin-left: 15px;
  flex-wrap: wrap;
}
.produto-item {
  margin: 2vw 4vw 2vw 4vw;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.produto-item img {
  border: solid 3px #08607C;
  border-radius: 20px;
  width: 12vw;
  height: 9vw;
  object-fit: cover;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.produto-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.produto-item h2 {
  font-size: 1.2rem;
  color: white;
  background-color: #08607C;
  border-radius: 100px;
  width: fit-content;
  padding: 5px 10px 5px 10px;
  margin-top: 10px;
  margin-left: 0;
}
.produto-item p {
  color: #08607C;
  font-weight: bold;
  margin-top: 5px;
}
div.produtosdabigbig {
  background-color: #fff;
}

/* Estilos para clientes */
.quantidade-disponivel {
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0;
}

.cliente-actions {
  margin-top: 10px;
}

.add-to-cart-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #218838;
}

/* Estilos para proprietários */
.owner-product {
  cursor: pointer;
}

.owner-product:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.owner-product-actions {
  margin-top: 10px;
}

.edit-hint {
  color: #666;
  font-size: 0.8rem;
  font-style: italic;
}

/* Estilos para modais de edição */
.edit-modal {
  max-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #08607C;
  box-shadow: 0 0 5px rgba(8, 96, 124, 0.3);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin-top: 0;
  color: #08607C;
  text-align: center;
}

.product-info {
  text-align: center;
  margin-bottom: 20px;
}

.product-info img {
  width: 100px;
  height: 75px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product-info h4 {
  margin: 10px 0;
  color: #333;
}

.product-info p {
  margin: 5px 0;
  color: #666;
}

.quantity-selector {
  margin-bottom: 20px;
}

.quantity-selector label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #08607C;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.quantity-controls span {
  font-size: 18px;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

.confirm-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #218838;
}

.confirm-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

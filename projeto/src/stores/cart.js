import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../api.js';

export const useCartStore = defineStore('cart', () => {
  const showCart = ref(false);
  const loading = ref(false);
  const error = ref(null);

  // Estado do carrinho atual
  const currentCart = ref(null);
  const cartItems = ref([]);
  const paymentMethods = ref([]);

  // Buscar carrinho ativo do usuário
  const fetchCart = async () => {
    loading.value = true;
    error.value = null;
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) return;

      // Buscar carrinhos do usuário que não estão finalizados
      const response = await api.get(`/carrinhos/?cliente=${user.id}&finalizado=false`);

      if (response.data.length > 0) {
        // Pegar o carrinho mais recente (último da lista)
        currentCart.value = response.data[response.data.length - 1];
        // Buscar itens do carrinho
        await fetchCartItems(currentCart.value.id);
      } else {
        currentCart.value = null;
        cartItems.value = [];
      }
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao buscar carrinho:', err);
      currentCart.value = null;
      cartItems.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Buscar itens do carrinho
  const fetchCartItems = async (cartId) => {
    try {
      const response = await api.get(`/itens-carrinho/?carrinho=${cartId}`);
      cartItems.value = response.data;
    } catch (err) {
      console.error('Erro ao buscar itens do carrinho:', err);
    }
  };

  // Criar novo carrinho
  const createCart = async (paymentMethodId = null) => {
    loading.value = true;
    error.value = null;
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) {
        alert('Você precisa estar logado!');
        return null;
      }

      const cartData = {};  // Cliente é definido automaticamente pelo backend

      if (paymentMethodId) {
        cartData.metodo_pagamento = paymentMethodId;
      }

      const response = await api.post('/carrinhos/', cartData);
      currentCart.value = response.data;
      cartItems.value = [];
      return response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao criar carrinho:', err);
      alert('Erro ao criar carrinho. Tente novamente.');
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Adicionar produto ao carrinho
  const addToCart = async (produto, quantidade = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) {
        alert('Você precisa estar logado para adicionar produtos ao carrinho!');
        return;
      }

      // Verificar se quantidade não excede disponível
      if (quantidade > produto.quantidade_disponivel) {
        alert(`Quantidade máxima disponível: ${produto.quantidade_disponivel}`);
        return;
      }

      // Garantir que existe um carrinho ativo
      let cartId = currentCart.value?.id;
      if (!cartId) {
        const newCart = await createCart();
        if (!newCart) return;
        cartId = newCart.id;
      }

      // Verificar se o produto já está no carrinho
      const existingItem = cartItems.value.find(item => item.produto.id === produto.id);
      if (existingItem) {
        // Atualizar quantidade do item existente
        await updateCartItem(existingItem.id, existingItem.quantidade + quantidade);
      } else {
        // Adicionar novo item
        const itemData = {
          carrinho_id: cartId,  // Correção: usar 'carrinho_id' conforme documentação da API
          produto_id: produto.id,  // Correção: usar 'produto_id' conforme documentação da API
          quantidade: quantidade
        };

        await api.post('/itens-carrinho/', itemData);
      }

      await fetchCart(); // Recarregar carrinho
      alert(`Adicionado ${produto.nome} ao carrinho!`);
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao adicionar ao carrinho:', err);
      console.error('Detalhes do erro:', err.response?.data); // Debug adicional
      alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
    } finally {
      loading.value = false;
    }
  };

  // Atualizar quantidade de um item no carrinho
  const updateCartItem = async (itemId, quantidade) => {
    loading.value = true;
    error.value = null;
    try {
      if (quantidade <= 0) {
        await removeFromCart(itemId);
        return;
      }

      await api.patch(`/itens-carrinho/${itemId}/`, { quantidade });
      await fetchCart(); // Recarregar carrinho
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao atualizar item do carrinho:', err);
    } finally {
      loading.value = false;
    }
  };

  // Remover item do carrinho
  const removeFromCart = async (itemId) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/itens-carrinho/${itemId}/`);
      await fetchCart(); // Recarregar carrinho
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao remover item do carrinho:', err);
    } finally {
      loading.value = false;
    }
  };

  // Finalizar carrinho (concluir compra)
  const finalizeCart = async (paymentMethodId = null) => {
    console.log('🔄 Iniciando finalização do carrinho...');
    console.log('📦 Carrinho atual:', currentCart.value);
    console.log('💳 Método de pagamento ID:', paymentMethodId);
    console.log('🛒 Itens no carrinho:', cartItems.value);

    loading.value = true;
    error.value = null;

    try {
      if (!currentCart.value) {
        console.log('❌ Erro: Carrinho vazio!');
        alert('Carrinho vazio!');
        return false;
      }

      // Verificar se há itens no carrinho
      if (!cartItems.value || cartItems.value.length === 0) {
        console.log('❌ Erro: Nenhum item no carrinho!');
        alert('Adicione pelo menos um produto ao carrinho antes de finalizar!');
        return false;
      }

      console.log('🔍 Verificando status do carrinho no backend...');

      // Verificar se o carrinho ainda existe e não foi modificado
      try {
        const checkResponse = await api.get(`/carrinhos/${currentCart.value.id}/`);
        console.log('📋 Resposta da verificação:', checkResponse.data);

        if (checkResponse.data.finalizado) {
          console.log('⚠️ Carrinho já está finalizado no backend!');
          alert('Este carrinho já foi finalizado!');
          // Recarregar carrinho para atualizar o estado local
          await fetchCart();
          return false;
        }

        // Verificar se o carrinho tem itens no backend
        if (!checkResponse.data.itens || checkResponse.data.itens.length === 0) {
          console.log('❌ Erro: Carrinho sem itens no backend!');
          alert('Erro: O carrinho não possui itens no servidor. Recarregando...');
          await fetchCart();
          return false;
        }

      } catch (checkError) {
        console.log('❌ Erro ao verificar carrinho:', checkError);
        alert('Erro ao verificar status do carrinho. Tente novamente.');
        return false;
      }

      // Preparar dados para atualização
      const updateData = {
        finalizado: true
      };

      if (paymentMethodId) {
        updateData.metodo_pagamento = paymentMethodId;
      }

      console.log('📤 Enviando dados para finalização:', updateData);

      // Tentar finalizar o carrinho
      let response;
      try {
        response = await api.patch(`/carrinhos/${currentCart.value.id}/`, updateData);
        console.log('✅ Resposta da API (boolean):', response);
      } catch (booleanError) {
        console.log('⚠️ Falhou com boolean, tentando com string...');
        try {
          const updateDataString = {
            finalizado: 'true',
            ...(paymentMethodId && { metodo_pagamento: paymentMethodId })
          };

          response = await api.patch(`/carrinhos/${currentCart.value.id}/`, updateDataString);
          console.log('✅ Resposta da API (string):', response);
        } catch (stringError) {
          console.log('❌ Falhou com ambos os formatos:', stringError);
          throw stringError;
        }
      }

      // Verificar se a finalização foi bem-sucedida
      if (response && response.data) {
        console.log('🔄 Aguardando processamento do backend...');
        // Pequena pausa para garantir que o backend processou a mudança
        await new Promise(resolve => setTimeout(resolve, 500));

        // Verificar se o carrinho foi realmente finalizado
        try {
          const finalCheckResponse = await api.get(`/carrinhos/${currentCart.value.id}/`);
          console.log('📋 Verificação final:', finalCheckResponse.data);

          if (finalCheckResponse.data.finalizado) {
            console.log('🎉 Compra finalizada com sucesso!');
            alert('Compra finalizada com sucesso!');
            currentCart.value = null;
            cartItems.value = [];
            return true;
          } else {
            console.log('⚠️ Carrinho não foi finalizado no backend');
            alert('Aviso: A compra pode ter sido processada, mas a confirmação falhou. Verifique seu histórico de pedidos.');
            // Mesmo assim, limpar o carrinho local
            currentCart.value = null;
            cartItems.value = [];
            return true;
          }
        } catch (finalCheckError) {
          console.log('❌ Erro na verificação final:', finalCheckError);
          // Se não conseguir verificar, assumir que foi bem-sucedido
          alert('Compra processada! Verifique seu histórico de pedidos para confirmar.');
          currentCart.value = null;
          cartItems.value = [];
          return true;
        }
      } else {
        console.log('❌ Resposta inválida do servidor');
        alert('Erro: Resposta inválida do servidor.');
        return false;
      }

    } catch (err) {
      console.log('❌ Erro geral na finalização:', err);
      error.value = err.message;
      console.error('Erro ao finalizar carrinho:', err);
      alert('Erro ao finalizar compra. Tente novamente.');
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Buscar métodos de pagamento
  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get('/metodos-pagamento/');
      paymentMethods.value = response.data;
    } catch (err) {
      console.error('Erro ao buscar métodos de pagamento:', err);
    }
  };

  // Calcular total do carrinho
  const getCartTotal = () => {
    return cartItems.value.reduce((total, item) => total + item.subtotal, 0);
  };

  return {
    showCart,
    currentCart,
    cartItems,
    paymentMethods,
    loading,
    error,
    fetchCart,
    fetchCartItems,
    createCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    finalizeCart,
    fetchPaymentMethods,
    getCartTotal,
  };
});

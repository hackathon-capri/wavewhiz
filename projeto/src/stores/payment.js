import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../api.js';

export const usePaymentStore = defineStore('payment', () => {
  const loading = ref(false);
  const error = ref(null);
  const paymentMethods = ref([]);

  // Buscar métodos de pagamento
  const fetchPaymentMethods = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/metodos-pagamento/');
      paymentMethods.value = response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao buscar métodos de pagamento:', err);
    } finally {
      loading.value = false;
    }
  };

  // Criar novo método de pagamento
  const createPaymentMethod = async (nome) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/metodos-pagamento/', { nome });
      paymentMethods.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao criar método de pagamento:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Atualizar método de pagamento
  const updatePaymentMethod = async (id, nome) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.patch(`/metodos-pagamento/${id}/`, { nome });
      const index = paymentMethods.value.findIndex(method => method.id === id);
      if (index !== -1) {
        paymentMethods.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao atualizar método de pagamento:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Deletar método de pagamento
  const deletePaymentMethod = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/metodos-pagamento/${id}/`);
      paymentMethods.value = paymentMethods.value.filter(method => method.id !== id);
    } catch (err) {
      error.value = err.message;
      console.error('Erro ao deletar método de pagamento:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Buscar método de pagamento por ID
  const getPaymentMethodById = (id) => {
    return paymentMethods.value.find(method => method.id === id);
  };

  return {
    paymentMethods,
    loading,
    error,
    fetchPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    getPaymentMethodById,
  };
});
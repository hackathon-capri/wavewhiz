import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../api.js';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchProducts = async (lojaId = null) => {
    loading.value = true;
    error.value = null;
    try {
      const params = lojaId ? { loja: lojaId } : {};
      const response = await api.get('/produtos/', { params });
      products.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const createProduct = async (productData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/produtos/', productData, { headers: { 'Content-Type': 'multipart/form-data' } });
      // Optionally add to products list
      products.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { products, loading, error, fetchProducts, createProduct };
});
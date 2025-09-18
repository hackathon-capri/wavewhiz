import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../api.js';

export const useLojasStore = defineStore('lojas', () => {
  const lojas = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchLojas = async (categoriaId = null) => {
    loading.value = true;
    error.value = null;
    try {
      const params = categoriaId ? { categoria: categoriaId } : {};
      const response = await api.get('/lojas/', { params });
      lojas.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchLojaById = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get(`/lojas/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchCategorias = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/categorias/');
      return response.data;
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchLojasByEmpreendedor = async (empreendedorId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/lojas/', { params: { empreendedor: empreendedorId } });
      return response.data;
    } catch (err) {
      error.value = err.message;
      return [];
    } finally {
      loading.value = false;
    }
  };

  return { lojas, loading, error, fetchLojas, fetchLojaById, fetchCategorias, fetchLojasByEmpreendedor };
});
<script setup>
import { ref } from 'vue'
import CadastroComponent from "@/components/CadastroComponent.vue";
import EmpreendedorComponent from '@/components/EmpreendedorComponent.vue'
import ClienteComponent from '@/components/ClienteComponent.vue';

const mostrarBotoesEscolha =  ref(true)
const mostrarCadastroEmpreendedor = ref(false)
const mostrarCadastroCliente = ref(false)

function mostrarEmpreendedor() {
  mostrarCadastroEmpreendedor.value = true
  mostrarBotoesEscolha.value = false
}
function mostrarCliente() {
  mostrarCadastroCliente.value = true
  mostrarBotoesEscolha.value = false
}

</script>
<template>
  <cadastro-component
    v-if="mostrarBotoesEscolha"
    @mostrarEmpreendedor="mostrarEmpreendedor"
    @mostrarCliente="mostrarCliente"
  />
  <empreendedor-component v-if="mostrarCadastroEmpreendedor"/>
  <cliente-component v-if="mostrarCadastroCliente"/>
</template>


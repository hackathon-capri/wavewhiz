<script setup>
import { ref } from 'vue'
import CadastroComponent from "@/components/CadastroComponent.vue";
import EmpreendedorComponent from '@/components/EmpreendedorComponent.vue'

const mostrarBotoesEscolha =  ref(true)
const mostrarCadastroEmpreendedor = ref(false)

function mostrarEmpreendedor() {
  mostrarCadastroEmpreendedor.value = true
  mostrarBotoesEscolha.value = false
}

</script>
<template>
  <cadastro-component v-if="mostrarBotoesEscolha" @mostrarEmpreendedor="mostrarEmpreendedor" />
  <empreendedor-component v-if="mostrarCadastroEmpreendedor"/>
</template>

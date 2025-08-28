
import { ref } from 'vue'
import { defineStore } from 'pinia'
import SobreNosComponent from '@/components/SobreNosComponent.vue'

export const useAboutStore = defineStore('about', () => {
  const showAbout = ref(false)

  function toggleAbout() {
    showAbout.value = !showAbout.value
  }

  function openAbout() {
    showAbout.value = true
  }

  function closeAbout() {
    showAbout.value = false
  }

  return {
    showAbout,
    toggleAbout,
    openAbout,
    closeAbout,
  }
})





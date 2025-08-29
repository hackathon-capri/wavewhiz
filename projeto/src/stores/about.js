
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAboutStore = defineStore('about', () => {
  const showAbout = ref(false)

  function openAbout() {
    showAbout.value = true
  }

  function closeAbout() {
    showAbout.value = false
  }

  return {
    showAbout,
    openAbout,
    closeAbout,
  }
})





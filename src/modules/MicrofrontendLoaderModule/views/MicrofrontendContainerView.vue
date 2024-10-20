<script setup lang="ts">
import { ref, onMounted } from 'vue'

const microfrontendContainer = ref<HTMLElement>()

onMounted(() => {
  // Загрузка микрофронтенда
  const script1 = document.createElement('script')
  script1.type = 'module'
  script1.src = 'http://localhost:3001/src/main.ts' // Убедитесь, что URL соответствует вашему микрофронтенду
  script1.onload = () => {
    // Предполагаем, что микрофронтенд экспортирует функцию render
    if (microfrontendContainer.value) {
      window.microfrontend.render(microfrontendContainer.value)
    }
  }
  document.head.appendChild(script1)
})
</script>

<template>
  <div>
    <h1>Контейнерное приложение</h1>
    <div ref="microfrontendContainer" class="container"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}
</style>

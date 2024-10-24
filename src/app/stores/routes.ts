import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RouteRecord } from 'vue-router'

export const useRoutesStore = defineStore('RoutesStore', () => {
  const routes = ref<RouteRecord[]>()

  const getRoutes = computed(() => {
    return routes.value
  })

  const setRoutes = (data: RouteRecord[]) => {
    routes.value = data
  }

  return { getRoutes, setRoutes }
})

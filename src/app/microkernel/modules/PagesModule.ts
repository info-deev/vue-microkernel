import type { Microkernel } from '../classes/Microkernel.class'
import type { Event, Module } from '../types/types'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/app/router'
import type { RouteRecordRaw } from 'vue-router'

import moduleExistenceChecking from '../middleware/moduleExistenceChecking.middleware'
import type { Scheduler } from '../classes/Scheduler.class'
import { useRoutesStore } from '@/app/stores/routes'

export interface IPModule {
  id: string
  label?: string
  routes?: RouteRecordRaw[]
  beforeMounted?: Function
  afterMounted?: Function
}

export const usePagesModuleStore = defineStore('PagesModuleStore', () => {
  const modules = ref<string[]>([])

  return { modules }
})

/**
 * Создание функции, принимающей целевую функцию и массив промежуточных функций
 * @param targetFunction
 * @param middlewareFunctions
 * @returns
 */
function applyMiddleware(
  targetFunction: Function,
  middlewareFunctions: Function[],
) {
  // Возвращаем новую функцию, которая будет выполнять промежуточные функции перед целевой
  return function (...args: any) {
    // Выполнение всех промежуточных функций
    for (const middleware of middlewareFunctions) {
      const result = middleware(...args) // Сохраняем результат

      if (!result) {
        return // Прерывание выполнения целевой функции
      }
    }
    // Выполнение целевой функции только если все промежуточные функции прошли проверку
    return targetFunction(...args)
  }
}

function isLocalhost() {
  const localhost = ['localhost', '127.0.0.1']
  return localhost.includes(location.hostname)
}

// Пример PagesModule модуля
export default class PagesModule implements Module {
  name = 'PagesModule'
  store = usePagesModuleStore()
  middlewares = [moduleExistenceChecking]

  init(microkernel: Microkernel): void {}
  run(microkernel: Microkernel): void {
    microkernel.publish('log' as Event, `${this.name} запущен`)

    const scheduler = microkernel.getState('scheduler') as Scheduler
    const routesStore = useRoutesStore()

    if (scheduler) {
      scheduler.scheduleAt(new Date(Date.now() + 10000), () => {
        this.connectingModules()
        routesStore.setRoutes(router.getRoutes())
      })
    } else {
      this.connectingModules()
      routesStore.setRoutes(router.getRoutes())
    }
  }

  receiveData(data: any): void {
    console.log(`PagesModule получил данные: ${data}`)
  }

  connectingModules = () => {
    const runPageModule = applyMiddleware(this.addModule, this.middlewares)
    const modules = import.meta.glob('@/modules/*/index.ts', {
      eager: true,
    })

    for (const path in modules) {
      const module: any = modules[path]
      // Предполагаем, что экспортируется по умолчанию
      runPageModule(module.default)
    }
  }

  addModule = (pModule: IPModule) => {
    if (!pModule.id) {
      console.warn('Модуль не загружен: Отсутствие идентификатора модуля.')
      return
    }

    if (isLocalhost()) {
      console.group('🟢 Загрузка модуля:', `"${pModule.label || pModule.id}"`)
    }

    // Старт функции beforeMounted
    if (pModule.beforeMounted && typeof pModule.beforeMounted === 'function') {
      if (isLocalhost()) {
        console.log('Старт функции beforeMounted модуля')
      }
      pModule.beforeMounted()
    }

    // Добавление роутов модуля
    if (router && pModule.routes) {
      if (isLocalhost()) {
        console.log('Старт импорта роутов модуля')
      }

      pModule.routes.forEach(route => {
        if (isLocalhost()) {
          console.log(route)
        }

        router?.addRoute(route)
      })
    }

    this.store.modules.push(pModule.id)

    // Старт функции afterMounted
    if (pModule.afterMounted && typeof pModule.afterMounted === 'function') {
      if (isLocalhost()) {
        console.log('Старт функции afterMounted модуля')
      }
      pModule.afterMounted()
    }

    if (isLocalhost()) {
      console.groupEnd()
    }
  }
}

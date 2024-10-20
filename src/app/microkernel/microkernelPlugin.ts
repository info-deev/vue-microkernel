import type { Plugin } from 'vue'
import { Microkernel } from './classes/Microkernel.class'

export const microkernelPlugin: Plugin = {
  async install() {
    const microkernel = Microkernel.getInstance()

    window.microkernel = microkernel

    const modules = import.meta.glob('./modules/*.ts', {
      eager: true,
    })

    for (const path in modules) {
      const module: any = modules[path]
      // Предполагаем, что экспортируется по умолчанию
      microkernel.registerModule(new module.default())
    }
    microkernel.initModules()
    microkernel.runModules()
  },
}

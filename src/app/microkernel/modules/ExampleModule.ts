import type { Microkernel } from '../classes/Microkernel.class'
import type { Event, Module } from '../types/types'

// Пример модуля
export default class ExampleModule implements Module {
  name = 'ExampleModule'

  init(microkernel: Microkernel): void {}
  run(microkernel: Microkernel): void {
    microkernel.publish('log' as Event, `${this.name} запущен`)
  }

  receiveData(data: any): void {
    console.log(`ExampleModule получил данные: ${data}`)
  }
}

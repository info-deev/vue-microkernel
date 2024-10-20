import type { Microkernel } from '../classes/Microkernel.class'
import { Scheduler } from '../classes/Scheduler.class'
import type { Event, Module } from '../types/types'

// Пример SchedulerModule модуля
export default class SchedulerModule implements Module {
  name = 'SchedulerModule'

  init(microkernel: Microkernel): void {
    microkernel.setState('scheduler', new Scheduler())
  }
  run(microkernel: Microkernel): void {
    microkernel.publish('log' as Event, `${this.name} запущен`)
  }

  receiveData(data: any): void {
    console.log(`SchedulerModule получил данные: ${data}`)
  }
}

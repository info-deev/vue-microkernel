import type { Microkernel } from '../classes/Microkernel.class'

// Интерфейс для определенного модуля
export interface Module {
  name: string
  init(microkernel: Microkernel): void
  run(microkernel: Microkernel): void
  receiveData(data: any): void
}

export type Event = 'log'

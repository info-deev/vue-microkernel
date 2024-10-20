import { Microkernel } from '../classes/Microkernel.class'
import type { Event, Module } from '../types/types'

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// Пример LogModule модуля
export default class LogModule implements Module {
  name = 'LogModule'
  init(microkernel: Microkernel): void {
    microkernel.subscribe('log' as Event, this.receiveData)
  }

  run(microkernel: Microkernel): void {
    microkernel.publish('log' as Event, `${this.name} запущен`)
  }

  receiveData(data: any): void {
    console.log(`%c${formatDate(new Date())}:`, 'color: gray', data)
  }
}

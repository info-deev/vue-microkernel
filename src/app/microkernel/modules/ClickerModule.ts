import type { Microkernel } from '../classes/Microkernel.class'
import type { Event, Module } from '../types/types'

// Пример ClickerModule модуля
export default class ClickerModule implements Module {
  name = 'ClickerModule'

  init(microkernel: Microkernel): void {
    window.addEventListener('click', (event: MouseEvent) =>
      this.handleButtonClick(event, microkernel),
    )
  }
  run(microkernel: Microkernel): void {
    microkernel.publish('log' as Event, `${this.name} запущен`)
  }

  receiveData(data: any): void {
    console.log(`ClickerModule получил данные: ${data}`)
  }

  handleButtonClick(event: MouseEvent, microkernel: Microkernel) {
    const target = event.target as HTMLElement // Приведение типа к HTMLElement

    // Проверяем, является ли целевой элемент кнопкой или ссылкой
    if (target.tagName === 'BUTTON') {
      microkernel.publish('log' as Event, `Кнопка нажата: ${target.innerText}`)
    } else if (target.tagName === 'A') {
      const anchor = target as HTMLAnchorElement // Приведение типа к HTMLAnchorElement
      // console.log('Ссылка нажата:', anchor.innerText, anchor.href)
      const message = `Ссылка нажата: ${anchor.innerText} ${anchor.href}`
      microkernel.publish('log' as Event, message)
    }
  }
}

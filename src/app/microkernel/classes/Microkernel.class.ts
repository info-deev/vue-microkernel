import type { Event, Module } from '../types/types'

/**
 * Класс Microkernel для управления модулями и событиями.
 */
export class Microkernel {
  /**
   * Хранит экземпляр класса
   * @type {Microkernel}
   * @private
   */
  private static instance: Microkernel

  /**
   * Хранит зарегистрированные модули.
   * @type {Map<string, Module>}
   * @private
   */
  private modules: Map<string, Module> = new Map()

  /**
   * Хранит слушателей событий.
   * @type {Map<string, Function[]>}
   * @private
   */
  private eventListeners: Map<string, Function[]> = new Map()

  /**
   * Хранит общее состояние приложения.
   * @type {Record<string, any>}
   * @private
   */
  private store: Record<string, any> = {}

  /**
   * Приватный конструктор, чтобы предотвратить создание экземпляров извне
   */
  private constructor() {}

  /**
   * Получает единственный экземпляр класса Microkernel.
   * Если экземпляр еще не создан, он будет инициализирован.
   * @returns {Microkernel} Экземпляр класса Microkernel.
   */
  public static getInstance(): Microkernel {
    if (!Microkernel.instance) {
      Microkernel.instance = new Microkernel()
    }
    return Microkernel.instance
  }

  /**
   * Регистрирует новый модуль.
   * @param {Module} module - Модуль для регистрации.
   */
  public registerModule(module: Module): void {
    this.modules.set(module.name, module)
  }

  /**
   * Инициализирует все зарегистрированные модули.
   */
  public initModules(): void {
    this.modules.forEach(module => module.init(this))
  }

  /**
   * Запускает все зарегистрированные модули.
   */
  public runModules(): void {
    this.modules.forEach(module => module.run(this))
  }

  /**
   * Подписывается на событие.
   * @param {Event | string} event - Имя события.
   * @param {Function} listener - Функция-обработчик события.
   */
  public subscribe(event: Event | string, listener: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, [])
    }
    this.eventListeners.get(event)!.push(listener)
  }

  /**
   * Публикует событие с данными.
   * @param {Event | string} event - Имя события.
   * @param {any} data - Данные, передаваемые с событием.
   */
  public publish(event: Event | string, data: any): void {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach(listener => listener(data))
    }
  }

  /**
   * Получает значение из общего состояния.
   * @param {string} key - Ключ состояния.
   * @returns {any} - Значение состояния.
   */
  public getState(key: string): any {
    return this.store[key]
  }

  /**
   * Устанавливает значение в общее состояние.
   * @param {string} key - Ключ состояния.
   * @param {any} value - Значение для установки.
   */
  public setState(key: string, value: any): void {
    this.store[key] = value
    this.publish(`stateChanged:${key}`, value)
  }

  /**
   * Удаляет значение из общего состояния.
   * @param {string} key - Ключ состояния, который нужно удалить.
   */
  public removeState(key: string): void {
    if (this.store.hasOwn(key)) {
      delete this.store[key]
      this.publish(`stateRemoved:${key}`, null)
    }
  }
}

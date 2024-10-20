/**
 * Класс Scheduler для управления задачами.
 */
export class Scheduler {
  private tasks: Map<number, number> = new Map()
  private taskIdCounter: number = 0

  /**
   * Запланировать периодическую задачу.
   *
   * @param interval - Интервал в миллисекундах для выполнения задачи.
   * @param task - Функция, которая будет выполняться периодически.
   * @returns Идентификатор запланированной задачи.
   */
  scheduleEvery(interval: number, task: () => void): number {
    const taskId = this.taskIdCounter++
    const timeoutId = setInterval(() => {
      task()
    }, interval)
    this.tasks.set(taskId, timeoutId)
    return taskId // Возвращаем идентификатор задачи
  }

  /**
   * Останавливает задачу по заданному идентификатору.
   *
   * @param taskId - Идентификатор задачи, которую нужно остановить.
   * @returns {boolean} - Возвращает true, если задача была найдена и остановлена, иначе false.
   */
  stop(taskId: number): boolean {
    const timeoutId = this.tasks.get(taskId)
    if (timeoutId) {
      clearInterval(timeoutId)
      clearTimeout(timeoutId)
      this.tasks.delete(taskId) // Удаляем задачу из списка
      console.log(`Задача ID:${taskId} остановлена.`)
    } else {
      console.log(`Задача ID:${taskId} не найдена.`)
    }
    return !!timeoutId // Возвращаем true, если задача была найдена
  }

  /**
   * Запланировать задачу на выполнение в заданное время.
   *
   * @param date - Дата и время, когда задача должна быть выполнена.
   * @param task - Функция, которая будет выполнена в заданное время.
   * @returns Идентификатор запланированной задачи.
   */
  scheduleAt(date: Date, task: () => void): number {
    const taskId = this.taskIdCounter++
    const timeoutId = setTimeout(() => {
      task()
      this.tasks.delete(taskId) // Удаляем задачу после выполнения
    }, date.getTime() - Date.now())
    this.tasks.set(taskId, timeoutId)
    return taskId // Возвращаем идентификатор задачи
  }
}

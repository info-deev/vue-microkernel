<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Microkernel } from '@/app/microkernel/classes/Microkernel.class'
import type { Scheduler } from '@/app/microkernel/classes/Scheduler.class'

const kernel = Microkernel.getInstance()
const tasks = ref<number[]>([])

// Класс Scheduler может как планировать периодические задачи,
// так и выполнять задачи в заданное время
const scheduler = kernel.getState('scheduler') as Scheduler

onMounted(() => {
  if (scheduler) {
    // Добавление задач
    const task1 = scheduler.scheduleAt(new Date(Date.now() + 5000), () =>
      kernel.publish('log', 'Task 1 executed'),
    ) // Запустится через 5 секунд
    tasks.value.push(task1)

    // Запускается каждые 2 секунды
    const task2 = scheduler.scheduleEvery(2000, () =>
      kernel.publish('log', 'Task 2: ping'),
    )
    tasks.value.push(task2)
  }
})

onUnmounted(() => {
  if (scheduler && tasks.value.length) {
    for (const taskId of tasks.value) {
      scheduler.stop(taskId)
    }
  }
})
</script>

<template>
  <div>
    <h1>SchedulerView (SchedulerModule)</h1>
  </div>
</template>

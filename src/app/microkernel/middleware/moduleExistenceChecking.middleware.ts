import { usePagesModuleStore } from '../modules/PagesModule'
import type { IPModule } from '../modules/PagesModule'

export default (param: IPModule) => {
  const store = usePagesModuleStore()

  const result = !!store.modules.find(el => el === param.id)

  if (result) {
    console.group(`🔴 Загрузка модуля: "${param.label || param.id}"`)
    console.log(
      `%cМодуль ${param.label || param.id} не загружен, найдено совпадение по ID`,
      'color: pink',
    )
    console.groupEnd()
  }

  return !result
}

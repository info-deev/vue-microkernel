import type { IPModule } from '@/app/microkernel/modules/PagesModule'
import { routes } from './router'

const module: IPModule = {
  id: 'SchedulerModule',
  label: 'Планировщик',
  routes,
  beforeMounted: () => {},
  afterMounted: () => {},
}

export default module

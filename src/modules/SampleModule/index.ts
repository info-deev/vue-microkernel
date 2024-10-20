import type { IPModule } from '@/app/microkernel/modules/PagesModule'
import { routes } from './router'

const module: IPModule = {
  id: 'SampleModule',
  label: 'Образец модуля',
  routes,
  beforeMounted: () => {},
  afterMounted: () => {},
}

export default module

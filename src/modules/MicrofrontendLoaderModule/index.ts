import type { IPModule } from '@/app/microkernel/modules/PagesModule'
import { routes } from './router'

const module: IPModule = {
  id: 'MicrofrontendLoaderModule',
  label: 'Контейнер приложений',
  routes,
  beforeMounted: () => {},
  afterMounted: () => {},
}

export default module

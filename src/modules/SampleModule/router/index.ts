import type { RouteRecordRaw } from 'vue-router'

const PREFIX = ''
const prefixPath = PREFIX ? `/${PREFIX.toLowerCase()}` : ''

export const routes: RouteRecordRaw[] = [
  {
    path: `${prefixPath}/sample`,
    name: `${PREFIX}Sample`,
    component: () => import('../views/SampleView.vue'),
  },
]

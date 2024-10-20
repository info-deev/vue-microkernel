import type { RouteRecordRaw } from 'vue-router'

const PREFIX = ''
const prefixPath = PREFIX ? `/${PREFIX.toLowerCase()}` : ''

export const routes: RouteRecordRaw[] = [
  {
    path: `${prefixPath}/scheduler`,
    name: `${PREFIX}Scheduler`,
    component: () => import('../views/SchedulerView.vue'),
  },
]

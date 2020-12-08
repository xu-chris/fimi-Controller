
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/training/:id',
        name: 'Training',
        component: () => import('pages/Training.vue')
      }
    ]
  },
  {
    path: '/training/:id/in-training',
    name: 'In Training',
    component: () => import('layouts/InTrainingLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/InTraining.vue')
      },
      {
        path: '/training/:id/after-training',
        name: 'After Training',
        component: () => import('pages/AfterTraining.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/404.vue')
  }
]

export default routes

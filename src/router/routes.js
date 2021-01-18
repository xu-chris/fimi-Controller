
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Start',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/training/',
        name: 'Training',
        component: () => import('pages/Training.vue')
      },
      {
        path: '/in-training/',
        name: 'InTraining',
        component: () => import('pages/InTraining.vue')
      },
      {
        path: '/post-training/',
        name: 'PostTraining',
        component: () => import('pages/PostTraining.vue')
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

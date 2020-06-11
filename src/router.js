import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/views/SignUp.vue'
import Tasks from '@/views/dashboard/Tasks.vue'
import Profile from '@/views/dashboard/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */'@/views/dashboard/Dashboard.vue'),
      children: [{
        path: 'tasks',
        name: 'tasks',
        //component: import(/* webpackChunkName: "tasks" */'./views/Tasks.vue')
        component: Tasks
      }, {
        path:'profile',
        name:'profile',
        component:Profile
      }]
    }
  ]
})

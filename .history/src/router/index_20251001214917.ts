import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../Login.vue'
import Register from '../Register.vue'
import Home from '../Home.vue'
import Dashboard from '../Dashboard.vue' // 新增
import Files from '..//Files.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/files',
      name: 'Files',
      component: Files
    }
  ],
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Mall from '../components/IndexPage/ShoppingMall.vue'
import Register from '../components/pages/Register.vue'
import Login from '../components/pages/Login.vue'
import Goods from '../components/pages/Goods.vue'
import CategoryList from '../components/pages/CategoryList.vue'
import SPcart from '../components/pages/ShoppingCart.vue'
import Main from '../components/pages/Main.vue'
import Member from '../components/pages/Member.vue'
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'Mall',
        component: Mall
      },
      {
        path: '/categoryList',
        name: 'CategoryList',
        component: CategoryList
      },
      {
        path: '/shoppingcart',
        name: 'SPcart',
        component: SPcart
      },
      {
        path: '/member',
        name: 'Member',
        component: Member
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  }
];
const router = new VueRouter({
  routes
});
export default router

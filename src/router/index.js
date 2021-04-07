import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/login.vue';
import store from '@/store';
// import Index from '@/views/page/index.vue';  // 预加载
import getMenuRoutes from '../utils/permission.js';

Vue.use(VueRouter)

// 菜单权限配置
const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children:[{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
    component: () => import('@/views/page/ProductList.vue'),
  },
  {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '新增商品',
      icon: 'file-add',
      hidden: false,
    },
    component: () => import('@/views/page/ProductAdd.vue'),
  },
  {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,
    },
    component: () => import('@/views/page/ProductAdd.vue'),
  },
  {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'project',
      hidden: false,
    },
    component: () => import('@/views/page/Category.vue')
  }]
}]; // 异步路由数组

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [{
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'number',
          hidden: false,
        },
        component: () => import('../views/page/index.vue'), // 懒加载
      }]
},
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登入',
      hidden: true
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
let isAddRoutes = false;
// 每一次跳转路由之前使用回调函数
router.beforeEach((to, from, next) => { 
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if(!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);
        store.dispatch('changeMenuRoutes',routes.concat(menuRoutes)).then(()=> {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    } else {
      return next('/login');
    }
  }
  return next();
})
export default router;
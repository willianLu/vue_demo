import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

import { USER_PERMISSION, USER_MENU } from "@/const";

import Index from "@/views";
import Home from "@/views/home";
import Login from "@/views/login";
import NoFound from "@/views/404";
import User from "@/views/home/user";
import About from "@/views/home/about";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "*",
      component: NoFound
    }
  ]
});

const rootRouter = {
  path: "/home",
  component: Index,
  children: []
};

const asyncRouterMap = [
  {
    path: "/",
    permission: "p_home",
    title: "首页",
    name: "home",
    component: Home
  },
  {
    path: "/home/user",
    permission: "p_user",
    title: "用户列表",
    name: "user",
    component: User
  },
  {
    path: "/home/about",
    permission: "p_about",
    title: "关于我们",
    name: "about",
    component: About
  }
];

router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/404") {
    next();
    return;
  }
  let userMenu = store.state[USER_MENU];
  let permission = store.getters[USER_PERMISSION];
  if (userMenu && userMenu.length) {
    next();
  } else if (permission && permission.length) {
    let _userMenu = [];
    let _asyncRoute = {};
    let _routes = [];
    asyncRouterMap.forEach(item => {
      _asyncRoute[item.permission] = item;
    });
    permission.forEach(item => {
      if (item in _asyncRoute) {
        _userMenu.push({
          path: _asyncRoute[item].path,
          title: _asyncRoute[item].title
        });
        _routes.push(_asyncRoute[item]);
      }
    });
    rootRouter.children = _routes;
    store.commit(USER_MENU, _userMenu);
    router.addRoutes([rootRouter]);
    next({ ...to, replace: true });
  } else {
    next({ path: "/login" });
  }
});
export default router;

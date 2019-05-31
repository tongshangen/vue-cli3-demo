import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import NProgress from "nprogress"; //进度条
import "nprogress/nprogress.css";
// import Home from "../views/Home.vue";

Vue.use(Router);

const Routers = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // },
    {
      path: "/",
      redirect: "/home",
      component: () =>
        import(/* webpackChunkName: "layout" */ "../views/layout/layout.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/login/index.vue")
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "../views/layout/layout.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () =>
            import(/* webpackChunkName: "home" */ "../views/home/index.vue"),
          meta: {
            title: "首页"
          }
        },
        {
          path: "/text",
          name: "text",
          component: () =>
            import(/* webpackChunkName: "text" */ "../views/text/index.vue"),
          meta: {
            title: "text"
          }
        },
        {
          path: "/404",
          name: "404",
          component: () =>
            import(/* webpackChunkName: "error" */ "../views/error/404.vue"),
          meta: {
            title: "404"
          }
        }
      ]
    }
  ]
});

//判断是否存在token
Routers.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path !== "/login" && !store.state.token) {
    next("/login");
    NProgress.done(); // 结束Progress
  } else {
    next();
  }
  if (to.meta.roles) {
    to.meta.roles.includes(...store.getters.roles) ? next() : next("/404");
  } else {
    next();
  }
});

Routers.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default Routers;

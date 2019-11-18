import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      sessionStorage.setItem('positionY', savedPosition.y)
      return savedPosition
    } else {
      sessionStorage.setItem('positionY', 0)
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'top',
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/Top')
    },
    {
      path: '/top',
      name: 'top',
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/Top')
    },
    {
      path: '/user/:uid',
      name: 'user',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/User')
    },
    {
      path: '/article/:id',
      name: 'article',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/Article')
    },
    {
      path: '/@article/:id',
      redirect: '/article/:id'
    },
    {
      path: '/edit-article/:articleId',
      name: 'edit-article',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/EditArticle')
    },
    {
      path: '/edit-article/:articleId/:contentId',
      name: 'edit-article',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/EditArticle')
    },
    // {
    //   path: '/article-settings',
    //   name: 'new-article-settings',
    //   component: () =>
    //     import(/* webpackChunkName: "route-SignIn" */ '@/views/ArticleSettings')
    // },
    {
      path: '/article-settings/:articleId',
      name: 'article-settings',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/ArticleSettings')
    },
    {
      path: '/article-settings/:articleId/:writerId',
      name: 'article-settings',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/ArticleSettings')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/SignIn')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/SignIn')
    },
    {
      path: '/sign-in/:articleId',
      name: 'sign-in-with-redirect',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/SignIn')
    },
    {
      path: '/sign-up/:articleId',
      name: 'sign-up-with-redirect',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/SignIn')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Top from './views/Top.vue'
// import Calendar from './views/Calendar.vue'
import ArticleSettings from './views/ArticleSettings.vue'
import MyPage from './views/MyPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    },
    {
      path: '/my-page',
      name: 'my-page',
      component: MyPage
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/SignIn')
    },
    {
      path: '/sign-in/:redirect',
      name: 'sign-in',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/SignIn')
    },
    {
      path: '/article-settings',
      name: 'ArticleSettings',
      component: ArticleSettings
    }
    // {
    //   path: '/calendar/:id',
    //   name: 'calendar',
    //   component: Calendar
    // }
  ]
})

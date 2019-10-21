import Vue from 'vue'
import Router from 'vue-router'
import Top from './views/Top.vue'
// import Calendar from './views/Calendar.vue'
import ArticleSettings from './views/ArticleSettings.vue'
import MyPage from './views/MyPage.vue'
import EditArticle from './views/EditArticle.vue'

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
      path: '/edit-article/:id',
      name: 'edit-article',
      component: EditArticle
    },
    {
      path: '/article-settings',
      name: 'new-article-settings',
      component: ArticleSettings
    },
    {
      path: '/article-settings/:id',
      name: 'article-settings',
      component: ArticleSettings
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
      path: '/sign-up/:redirect',
      name: 'sign-up-with-redirect',
      props: true,
      component: () =>
        import(/* webpackChunkName: "route-SignIn" */ '@/views/SignIn')
    }
  ]
})

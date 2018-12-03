import Vue from 'vue'
import Router from 'vue-router'
import article from '../view/article.vue'
import articleMain from '../view/articleMain.vue'
import games from '../view/games.vue'
import links from '../view/links.vue'
import home from '../view/home.vue'
import page from '../view/index.vue'
import admin from '../view/admin/admin.vue'
import adminArticle from '../view/admin/article.vue'
import adminHome from '../view/admin/home.vue'
import adminGames from '../view/admin/games.vue'
import adminLinks from '../view/admin/links.vue'
import sign from '../view/sign.vue'
import account from '../view/account.vue'
import adminAccount from '../view/admin/account.vue'
import empty from '../components/views/empty.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/admin',
      redirect: '/admin/home'
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    },
    {
      path: '/empty',
      name: 'empty',
      component: empty
    },
    {
      path: '/',
      name: 'page',
      component: page,
      children: [
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'article',
          name: 'article',
          component: article
        },
        {
          path: 'article/:id',
          name: 'articleMain',
          component: articleMain
        },
        {
          path: 'links',
          name: 'links',
          component: links
        },
        {
          path: 'games',
          name: 'games',
          component: games
        },
        {
          path: 'account',
          name: 'account',
          component: account
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        {
          path: 'acticle',
          name: 'adminArticle',
          component: adminArticle
        },
        {
          path: 'home',
          name: 'adminHome',
          component: adminHome
        },
        {
          path: 'games',
          name: 'adminGames',
          component: adminGames
        },
        {
          path: 'links',
          name: 'adminLinks',
          component: adminLinks
        },
        {
          path: 'account',
          name: 'adminAccount',
          component: adminAccount
        }
      ]
    }
  ]
})

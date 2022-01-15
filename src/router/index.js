import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  //Hash, Histoty
  //https://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  //페이지 구분
  //https://google.com/about
  routes: [
    { //main
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    { //about
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})

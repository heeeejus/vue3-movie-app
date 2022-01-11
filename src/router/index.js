import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'

export default createRouter({
  //Hash, Histoty
  //https://google.com/#/search
  history: createWebHashHistory(),
  //페이지 구분
  //https://google.com/about
  routes: [
    { //main
      path: '/',
      component: Home
    },
    {
      path: '/movie',
      component: Movie
    },
    { //about
      path: '/about',
      component: About
    }
  ]
})

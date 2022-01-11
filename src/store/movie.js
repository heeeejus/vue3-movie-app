import axios from 'axios'
import _uniqBy from 'loadsh/uniqBy' //중복 방지(api에 있는 중복을 방지한다.)

export default {
  //module!
  namespaced: true,
  //data!
  state: () => ({
    movies: [],
    message: 'Search for the movie title!',
    loading: false
  }),
  //computed!
  getters: {
    // movieIds(state) {
    //   return state.movies.map(m => m.imdbID)
    // }
  },
  //methods!
  mutations: { //변이 *데이터(state) 여기서만 변경 가능
    updateState(state, payload) {
      // ['movies, 'message', 'loadgin']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  actions: { //비동기로 동작 
    async searchMovies({ state, commit }, payload) {
      if(state.loading) { //동시에 여러번 실행되는 것을 막음
        return 
      }
      commit('updateState', {
        message: '',
        loading: true
      })
      //OMDB에서 데이터를 받아오는 곳
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) //301
        console.log(typeof totalResults) //String
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil( total/10 ) //268 => 27
        //추가 요청
        if ( pageLength > 1 ) {
          for (let page = 2; page <= pageLength; page += 1) {
            if(page > ( payload.number / 10 )) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if (res.data.Error) {
          reject(res.data.Error)
        }
         resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}
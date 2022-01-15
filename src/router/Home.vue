<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'

export default {
  components: {
    Headline,
    Search,
    MovieList
  },
  created() { 
    //page 변환시 초기화 되도록
    this.$store.commit('movie/resetMovies')
  }
}
</script>

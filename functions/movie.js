const axios = require('axios')
const OMDB_API_KEY = process.env.OMDB_API_KEY //환경변수로 지정

//api키를 서버에서 쓸수 있도록
exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body)
  const { title, type, year, page, id } = payload

  const url = id 
    ? `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if (data.Error){
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }    
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}
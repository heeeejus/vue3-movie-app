export default {
  install(app) {
    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          //완료 load가 끝나면 resolve를 실행할 수 있는 것
          resolve()
        })
      })
    }
  }
}
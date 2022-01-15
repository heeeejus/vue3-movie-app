export default {
  namespaced: true,
  state: () => ({//데이터 불변성을 위해 함수로 만들어줘야 고유해짐
    name: 'OMYO',
    email: 'OMYO@',
    blog: 'https://heropy.blog',
    phone: '+82-01-1234-5678',
    image: 'https://heropy.blog/css/images/logo.png'
  }) 
    
}
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'heee',
      age: 85,
      email: 'hhh@hh'
    })
  }
}
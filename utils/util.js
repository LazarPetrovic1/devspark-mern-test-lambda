function buildResponse(code, body) {
  return {
    statusCode: code,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }
}

module.exports.buildResponse = buildResponse;
/**
 * Fetch wrap used to make easier post,get Requests and with the option of caching the requests in the localStorage
 *
 * @param {*} url
 * @param {*} options with method, body, useCache(if  you want to enable cache) and its expiration time
 * @returns Promise
 */
const request = (url, { method = 'GET', body = null, useCache, expirationTimeCache }) => {
  const now = new Date().getTime()

  if (useCache) {
    let cachedRequest = localStorage.getItem(url)
    cachedRequest = cachedRequest && JSON.parse(cachedRequest)

    if (cachedRequest && now - cachedRequest.date < expirationTimeCache) {
      return Promise.resolve(cachedRequest.data)
    }
  }
  return fetch(url, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        useCache && localStorage.setItem(url, JSON.stringify({ data, date: now }))

        return data
      })
    }
    if (response.status >= 400) {
      return response.json().then(({ error }) => {
        throw Error(error)
      })
    }
  })
}

export { request }

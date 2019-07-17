function checkStatus (response) {
  if (response.ok) {
    const contentType = response.headers.get('Content-Type')

    if (contentType.includes('application/json')) {
      return Promise.resolve(response.json())
    }

    return Promise.resolve(response.text())
  }

  return response.json().then((json) => {
    const reason = {
      status: response.status,
      statusText: response.statusText,
      message: json.message || response.statusText,
    }

    return Promise.reject(reason)
  })
}

export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then((data) => ({ data }))
}
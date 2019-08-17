function set(key, value) {
  localStorage.setItem(key, value)
}

function get (key) {
 return localStorage.getItem(key)
}

function clear(key) {
  localStorage.removeItem(key)
}

export default {clear, set, get}

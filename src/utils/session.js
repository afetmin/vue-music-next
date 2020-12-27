/*
 * @Author: your name
 * @Date: 2020-12-27 10:50:48
 * @LastEditTime: 2020-12-27 11:27:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-music-next\src\utils\session.js
 */
export function getSession(key) {
  return sessionStorage.getItem(key)
}
export function setSession(key, value) {
  sessionStorage.setItem(key, value)
}

export function removeSession(key) {
  sessionStorage.removeItem(key)
}

export function clearSession() {
  sessionStorage.clear()
}
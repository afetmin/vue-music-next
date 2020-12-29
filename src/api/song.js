import request from '@/utils/request'

export function getSong(id) {
  return request({
    url: `/song/detail?ids=${id}`,
    method: 'get'
  })
}

export function getSongUrl(id) {
  return request({
    url: `/song/url?id=${id}`,
    method: 'get'
  })
}
export function getLyric(id) {
  return request({
    url: `/lyric?id=${id}`,
    method: 'get'
  })
}
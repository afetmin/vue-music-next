import request from '@/utils/request'

export function getSong(id) {
  return request({
    url: `/song/detail?ids=${id}`,
    method: 'get'
  })
}
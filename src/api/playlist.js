import request from '@/utils/request'

export function getPlaylist(limit = 30) {
  return request({
    url: `/personalized?limit=${limit}`,
    method: 'get'
  })
}
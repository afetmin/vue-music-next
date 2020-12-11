import request from '@/utils/request'

export function getSinger(limit = 100) {
  return request({
    url: `/top/artists?limit=${limit}`,
    method: 'get'
  })
}
import request from '@/utils/request'

export function getSinger(limit = 100) {
  return request({
    url: `/top/artists?limit=${limit}`,
    method: 'get'
  })
}

export function getSingerDetail(id) {
  return request({
    url: `/artist/top/song?id=${id}`,
    method: 'get'
  })
}
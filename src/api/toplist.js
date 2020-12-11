// 各种排行榜
import request from '@/utils/request'

export function getToplist() {
  return request({
    url: '/toplist/detail',
    method: 'get'
  })
}
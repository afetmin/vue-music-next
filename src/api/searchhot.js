// 热搜
import request from '@/utils/request'

export function getSearchHot() {
  return request({
    url: '/search/hot',
    method: 'get'
  })
}
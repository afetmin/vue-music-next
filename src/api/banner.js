import request from '@/utils/request'

export function getBanner(type=2) {
  // type: 0 PC, 1 android, 2 iphone, 3 ipad
  return request({
    url: `/banner?type=${type}`,
    method: 'get'
  })
}

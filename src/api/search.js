// 热搜
import request from '@/utils/request'
export { getSong } from './song'

export function getSearchHot() {
  return request({
    url: '/search/hot',
    method: 'get'
  })
}

export function getSearchSuggest(name) {
  return request({
    url: `/search/suggest?keywords=${name}`,
    method: 'get'
  })
}

export function getSearchSongs(name, page) {
  return request({
    url: `/search?keywords=${name}&offset=${page}`,
    method: 'get'
  })
}

export function getSearchSinger(name) {
  return request({
    url: `/search?keywords=${name}&type=100`,
    method: 'get'
  })
}
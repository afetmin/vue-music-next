// 歌单
import request from '@/utils/request'

export function getPlaylist(limit = 30) {
  return request({
    url: `/personalized?limit=${limit}`,
    method: 'get'
  })
}

export function getPlaylistDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`,
    method: 'get'
  })
}
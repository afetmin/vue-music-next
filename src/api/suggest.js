/*
 * @Author: afetmin
 * @Date: 2020-12-27 09:47:10
 * @LastEditTime: 2020-12-27 10:38:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-music-next\src\api\suggest.js
 */
import request from '@/utils/request'

export function getSuggest(keywords) {
  return request({
    url: `/search/suggest?keywords=${keywords}`,
    method: 'get'
  })
}
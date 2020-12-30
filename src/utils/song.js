import { getLyric } from '@/api/song'
import { ERR_OK } from '@/api/config'

export default class Song {
  constructor({ id, name, singer, album, image, aliaName }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.aliaName = aliaName
    this.image = image
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        if (res.code === ERR_OK && res.lrc) {
          this.lyric = res.lrc.lyric
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

function singerName(arr) {
  let name = arr.map((item) => {
    return item.name
  })

  return name.join('/')
}

export function createSong(music) {
  return new Song({
    id: music.id,
    singer: singerName(music.ar),
    name: music.name,
    // aliaName: filiterAliaName(music.alia),
    album: music.al.name,
    image: music.al.picUrl,
  })
}

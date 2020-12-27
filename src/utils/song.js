export default class Song {
  constructor({ id, name, singer, album, image, aliaName }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.aliaName = aliaName
    this.image = image
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
    image: music.al.picUrl
  })
}
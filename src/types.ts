export enum Type {
  ARTIST = "artist",
  GENRE = "genre",
}

export interface Song {
  artist: string,
  src: string,
}

export interface AnswerArtist {
  artist: string,
  picture: string
}

export interface QuestionGenre {
  answers: {
    src: string,
    genre: string
  }[],

  genre: string,
  type: Type
}

export interface QuestionArtist {
  answers: AnswerArtist[],
  song: Song,

  type: Type
}

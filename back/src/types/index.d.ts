export interface UserModel {
  id?: string;

  email: string;

  password: string;

  username: string;

  roles?: string[];

  photoURL?: string;

  isVerified: boolean;
}

export interface MovieModel {
  id?: string;

  name: string;

  synopsis: string;

  ageLimit?: number;

  releaseYear?: number;

  movieURL: string;

  bigPictureURL?: string;

  thumbnailURL: string;

  type: 'movie' | 'series' | 'documentary';

  genre: string[];
}

export interface ListModel {
  id?: string;

  movieIds: string[];

  name: string;

  genre: string[];

  type: string;
}

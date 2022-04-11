export interface UserModel {
  id?: string;

  email: string;

  password: string;

  userId: string;

  username: string;

  isAdmin: boolean;

  photoURL: string;
}

export interface TokenModel {
  id?: string;

  userId: string;

  token: string;

  expiresIn: string;
}

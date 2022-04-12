export interface UserModel {
  id?: string;

  email: string;

  password: string;

  username: string;

  isAdmin: boolean;

  photoURL?: string;

  isVerified: boolean;
}

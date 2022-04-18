export interface UserModel {
  id?: string;

  email: string;

  password: string;

  username: string;

  roles?: string[];

  photoURL?: string;

  isVerified: boolean;
}

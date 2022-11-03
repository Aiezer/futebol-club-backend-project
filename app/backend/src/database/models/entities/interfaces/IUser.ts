export interface IUserLogin {
  email: string;
  password: string;
}

export default interface IUser extends IUserLogin {
  id?: number;
  username: string;
  role: string;
}

export interface ITokenPayload {
  id?: number;
  username: string;
  role:string;
}

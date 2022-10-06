import { ILoginInputs } from "./loginInputs";

export interface IUsers {
  currentUser: {
    username: string;
    id: number;
    image: string;
    email: string;
  };
  login: (inputs: ILoginInputs) => Promise<void>;
  logout: () => Promise<void>;
}

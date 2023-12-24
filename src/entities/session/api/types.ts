import { Role } from "../model";

export type SessionDto = {
  access_token: string;
  expires_in: number;
  token_type: string;
  role: Role;
  first_name: string;
  last_name: string;
};

export type RequestLoginBody = {
  email: string;
  passwd: string;
};

export type RequestRegisterBody = {
  email: string;
  first_name: string;
  last_name: string;
  passwd: string;
};

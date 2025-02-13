import { User } from "lucide-react";

declare global {
  interface User {
    username?:      string;
    password?:      string;
    code?:          string;
    firstName?:     string;
    lastName?:      string;
    email?:         string;
    phoneNumber?:   string;
    country?:       string;
    gender?:        string;
    roleName?:      string;
    updatedDate?:   any;
  }

  interface UserPagingRequest extends BasePagingRequest<User> {

  }

  interface UserPagingResponse extends BasePagingResponse<User> {

  }

}

export {};

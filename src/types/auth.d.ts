import { List } from "postcss/lib/list";

declare global {

    interface AuthRequest {
        username: string;
        password: string;
      }

    interface AuthResponse {
      username: string;
      accessToken: string;
      role: List<Role>;
    }

    interface Role {
      name: string;
      description: string;
    }
  }
  
  export {};
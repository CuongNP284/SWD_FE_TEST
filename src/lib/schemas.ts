import * as z from "zod";

// login Schemas
export const loginFormData = z.object({
  username: z.string().min(5, "Username is required more than 10 characters"),
  password: z.string().min(5, "Password is required more than 10 characters"),
});

export type loginFormData = z.infer<typeof loginFormData>;

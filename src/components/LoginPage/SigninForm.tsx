import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormData } from '@/lib/schemas';
import { toast } from "sonner";
import { useAuth } from "@/components/hooks/useAuth";
import { z } from "zod";

// Define the type based on your Zod schema
type AuthRequest = z.infer<typeof loginFormData>;

const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AuthRequest>({
    resolver: zodResolver(loginFormData)
  });

  const auth = useAuth();

  const onSubmit = async (data: AuthRequest) => {
    try {
      console.log("Signing in...");
      auth.handleLogin(data);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-sky-950">Welcome back!</h1>

              <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                  <input
                    id="username"
                    type="username"
                    {...register("username")}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="hoang"
                  />
                  <label
                    htmlFor="signin-email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>)}
                </div>
                <div className="mt-10 relative">
                  <input
                    id="signin-password"
                    type="password"
                    {...register("password")}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="signin-password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-sky-950 hover:bg-sky-900 text-white-100 font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </form>
              <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-sky-950 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;

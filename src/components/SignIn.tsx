"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormData } from '@/lib/schemas';
import { useAuthenticateMutation } from '@/state/api/authApi';
import { toast } from "sonner";
import { useAuth } from "@/components/hooks/useAuth";
import { z } from "zod";
import LoginPage from "../components/LoginPage/LoginPage";

// Define the type based on your zod schema
type AuthRequest = z.infer<typeof loginFormData>;

const SignIn: React.FC = () => {
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
      console.log("Sign in...")
      auth.handleLogin(data);
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // const [isSignUp, setIsSignUp] = useState(false);

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-50">
    //   <div className="relative w-[850px] h-[500px] bg-white shadow-xl rounded-lg overflow-hidden">
    //     <div
    //       className={`absolute w-3/5 h-full p-10 transition-all duration-500 ${isSignUp ? "opacity-0 z-10" : "opacity-100 z-20"
    //         }`}
    //     >
    //       <h1 className="text-2xl font-bold text-blue-900 ">Sign In</h1>
    //       <div className="flex gap-3 my-4">
    //         <button className="p-2 bg-gray-200 rounded-full">
    //           <i className="fab fa-facebook-f"></i>
    //         </button>
    //         <button className="p-2 bg-gray-200 rounded-full">
    //           <i className="fab fa-google-plus-g"></i>
    //         </button>
    //         <button className="p-2 bg-gray-200 rounded-full">
    //           <i className="fab fa-linkedin-in"></i>
    //         </button>
    //       </div>

    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <div>
    //           <input
    //             {...register("username")}
    //             id="username"
    //             type="username"
    //             placeholder="Username"
    //             className="w-full p-3 my-2 bg-gray-100 rounded"
    //           />
    //           {errors.username && (
    //             <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
    //           )}
    //         </div>

    //         <div>
    //           <input
    //             {...register("password")}
    //             id="password"
    //             type="password"
    //             placeholder="Password"
    //             className="w-full p-3 my-2 bg-gray-100 rounded"
    //           />
    //           {errors.password && (
    //             <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
    //           )}
    //         </div>

    //         <a href="#" className="text-sm text-gray-500">Forgot your password?</a>
    //         <button disabled={isSubmitting} className="w-full mt-4 p-3 bg-blue-700 text-white rounded text-white-100">
    //           {isSubmitting ? 'Signing in...' : 'Sign In'}
    //         </button>
    //       </form>
    //     </div>



    //     <div
    //       className={`absolute w-3/5 h-full p-10 transition-all duration-500 ${isSignUp ? "opacity-100 z-20" : "opacity-0 z-10"
    //         }`}
    //     >
    //       <h1 className="text-2xl font-bold text-blue-900">Create Account</h1>
    //       <div className="flex gap-3 my-4">
    //         <button className="p-2 bg-gray-200 rounded-full">
    //           <i className="fab fa-facebook-f"></i>
    //         </button>
    //         <button className="p-2 bg-gray-200 rounded-full">
    //           <i className="fab fa-google-plus-g"></i>
    //         </button>
    //         <button className="p-2 bg-gray-200 rounded-full">
    //           <i className="fab fa-linkedin-in"></i>
    //         </button>
    //       </div>
    //       <input
    //         type="text"
    //         placeholder="Name"
    //         className="w-full p-3 my-2 bg-gray-100 rounded"
    //       />
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         className="w-full p-3 my-2 bg-gray-100 rounded"
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         className="w-full p-3 my-2 bg-gray-100 rounded"
    //       />
    //       <button className="w-full mt-4 p-3 bg-blue-700 text-white rounded text-white-100">
    //         Sign Up
    //       </button>
    //     </div>

    //     <div
    //       className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-r from-blue-800 to-blue-600 text-white flex flex-col items-center justify-center p-10"
    //     >
    //       {isSignUp ? (
    //         <>
    //           <h1 className="text-2xl font-bold text-white-100">Welcome Back!</h1>
    //           <p className="mt-2 text-center text-white-100">To keep connected with us please login with your personal info</p>
    //           <button
    //             className="mt-4 px-6 py-2 border border-white rounded text-white-100"
    //             onClick={() => setIsSignUp(false)}
    //           >
    //             Sign In
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <h1 className="text-2xl font-bold text-white-100">Hello, Friend!</h1>
    //           <p className="mt-2 text-center text-white-100">Enter your personal details and start your journey with us</p>
    //           <button
    //             className="mt-4 px-6 py-2 border border-white rounded text-white-100"
    //             onClick={() => setIsSignUp(true)}
    //           >
    //             Sign Up
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col min-h-screen items-center justify-center h-screen w-full bg-gray-50">
      <LoginPage />
    </div>
  );
};

export default SignIn;
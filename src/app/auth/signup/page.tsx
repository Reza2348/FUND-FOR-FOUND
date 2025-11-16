// ./src/app/auth/signup/page.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// خط زیر حذف شده است: import { useSignup } from "@/mutations/useSignup";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { FaGoogle, FaEye } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import GoogleLoginComponent from "@/components/GoogleLoginComponent/GoogleLoginComponent";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const { email, password, firstName, lastName } = data;

      const { data: signUpData, error: authError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        }
      );

      if (authError) throw authError;

      const user = signUpData.user;
      if (!user) throw new Error("Signup failed. User not created.");
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

      if (profileError)
        throw new Error("Failed to create profile. " + profileError.message);

      toast.success("Registration successful!");

      timerRef.current = setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 bg-white">
      <div className="max-w-sm w-full bg-white px-8">
        <h1 className="text-xl font-normal text-center mb-6">
          Create your personal account
        </h1>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 tracking-wider">
            FUND FOR FOUND
          </h2>
          <div className="flex justify-center items-center h-20">
            <Image
              src="/Vector.svg"
              alt="logo"
              width={30}
              height={30}
              priority
            />
          </div>
        </div>

        {/* Google Login */}
        <GoogleLoginComponent className="w-full border border-gray-300 bg-gray-50 text-gray-700 py-3 rounded-md mt-8 hover:bg-gray-100 transition-colors flex justify-center items-center cursor-pointer">
          <div className="flex items-center space-x-2">
            <FaGoogle className="w-5 h-5 mr-2" />
            <span>Continue with Google</span>
          </div>
        </GoogleLoginComponent>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName")}
              placeholder="Enter your first name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              placeholder="Enter your last name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="yourname@example.com"
              {...register("email")}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-[#644FC1] text-xs mt-1">
              We will send you a 6-digit code to your email
            </p>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 pr-10"
            />
            <FaEye
              className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer mt-[11px] ${
                showPassword ? "text-gray-400" : "text-gray-400"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
            onClick={(e) => isSubmitting && e.preventDefault()}
          >
            {isSubmitting ? "Signing up..." : "Continue"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-purple-700 ml-1 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

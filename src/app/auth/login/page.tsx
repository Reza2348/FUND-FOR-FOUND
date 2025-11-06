"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { FaEye, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import GoogleLoginComponent from "@/components/GoogleLoginComponent/GoogleLoginComponent";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

const loginSchema = z.object({
  identifier: z.string().min(1, "Mobile number or email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { identifier, password } = data;
      const email = identifier;

      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (error) throw error;
      if (!loginData.user) throw new Error("User not found");

      toast.success("Login successful!");
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-xs w-full">
        <div className="flex justify-center items-center h-20 mb-8">
          <Image src="/Vector.svg" alt="logo" width={50} height={50} priority />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-800">
          FUND FOR FOUND
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create an account or sign in to start creating
        </p>
        <GoogleLoginComponent className="w-full flex items-center justify-center border border-gray-300 bg-gray-50 text-gray-700 py-3 rounded-md mb-4 hover:bg-gray-100 transition duration-150 cursor-pointer">
          <FaGoogle className="w-5 h-5 mr-2" />
          <span>Continue with Google</span>
        </GoogleLoginComponent>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <p>Mobile number or email address</p>
            <label htmlFor="identifier" className="sr-only">
              Mobile number or email address
            </label>
            <input
              id="identifier"
              type="text"
              {...register("identifier")}
              placeholder="09124513268 or yourname@yahoo.com"
              className="w-full border px-3 py-3 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border px-3 py-3 rounded-md focus:ring-purple-500 focus:border-purple-500 pr-10"
            />

            <FaEye
              className="w-5 h-5 text-gray-400 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            />

            <Link
              href="/auth/Forgotpassword"
              className="text-xs text-purple-700 hover:underline mt-2 inline-block"
            >
              Forgot your password?
            </Link>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-700 text-white py-3 rounded-md font-medium hover:bg-purple-800 transition duration-150 mt-4"
          >
            {isSubmitting ? "Continuing..." : "Continue"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          Don&apos;t have one?
          <Link
            href="/auth/signup"
            className="text-purple-700 ml-1 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

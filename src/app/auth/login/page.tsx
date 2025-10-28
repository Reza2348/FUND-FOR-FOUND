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
import { FaEye, FaGoogle } from "react-icons/fa"; // Added FaGoogle here
import { useState } from "react";
import GoogleLoginComponent from "@/components/GoogleLoginComponent/GoogleLoginComponent"; // مطمئن شوید مسیر درست است

// ToastContainer dynamic import
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

// Schema validation
// NOTE: Renaming identifier to email if only email login is supported by the current flow
// Or: Keep identifier, but understand it's only used as an email in the onSubmit logic.
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
      // ISSUE #2: Assuming identifier is email for signInWithPassword.
      const email = identifier;

      // Attempt login with email/password
      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (error) throw error;
      if (!loginData.user) throw new Error("User not found");

      // ISSUE #3: Manual localStorage setting is generally discouraged.
      // Rely on the Supabase client's session management.
      // If you absolutely need to store user/session, consider a Context/State manager.
      // localStorage.setItem("user", JSON.stringify(loginData.user));
      // localStorage.setItem("session", JSON.stringify(loginData.session));

      toast.success("Login successful!");
      // Redirect after success
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  // Removed handleGoogleSignIn since we're using GoogleLoginComponent directly.

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

        {/* ❌ ISSUE #1 FIX: Directly use GoogleLoginComponent and apply styles and margin. */}
        <GoogleLoginComponent
          // Applying the desired button styles and bottom margin
          className="w-full flex items-center justify-center border border-gray-300 bg-gray-50 text-gray-700 py-3 rounded-md mb-4 hover:bg-gray-100 transition duration-150 cursor-pointer"
        >
          {/* Content for the Google button */}
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
            <p>Password</p>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full border px-3 py-3 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <FaEye
              className="w-5 h-5 text-gray-400 cursor-pointer absolute right-3 top-2/3 transform -translate-y-1/2"
              // Adjusted 'top-1/2' to 'top-2/3' to roughly center it relative to the input field if the 'p' tag above is creating an offset.
              onClick={() => setShowPassword(!showPassword)}
            />
            <Link
              href="/auth/Forgotpassword"
              className="text-xs text-purple-700 hover:underline mt-1 block"
            >
              Forgot your password?
            </Link>
            {/* FaEye positioning adjusted based on the input field */}

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-700 text-white py-3 rounded-md font-medium hover:bg-purple-800 transition duration-150 mt-4"
          >
            {isSubmitting ? "Continuing..." : "Continue"}
          </button>
        </form>

        {/* Signup link */}
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

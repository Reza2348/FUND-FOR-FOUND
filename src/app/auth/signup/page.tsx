"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

// Client-only Google login component
const GoogleLoginComponent = dynamic(
  () => import("@/components/GoogleLoginComponent/GoogleLoginComponent"),
  { ssr: false }
);

// Zod schema factory for i18n
export const signUpSchema = (t: any) =>
  z.object({
    firstName: z.string().min(1, t("first_name_required")),
    lastName: z.string().min(1, t("last_name_required")),
    email: z.string().email(t("invalid_email")),
    password: z.string().min(6, t("password_min_length")),
  });

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { t, ready } = useTranslation();

  // جلوگیری از mismatch در SSR و i18n
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: mounted ? zodResolver(signUpSchema(t)) : undefined,
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const { email, password, firstName, lastName } = data;

      const { data: signUpData, error: authError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: { data: { first_name: firstName, last_name: lastName } },
        }
      );

      if (authError) throw authError;

      const user = signUpData.user;
      if (!user) throw new Error(t("signup_failed"));

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

      if (profileError) throw new Error(t("profile_creation_failed"));

      toast.success(t("registration_success"));
      timerRef.current = setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("unknown_error");
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted || !ready) return null;

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 bg-white">
      <div className="max-w-sm w-full bg-white px-8">
        <h1 className="text-xl font-normal text-center mb-6">
          {t("create_account")}
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
            <span>{t("continueWithGoogle")}</span>
          </div>
        </GoogleLoginComponent>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">{t("or")}</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              {t("first_name")}
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName")}
              placeholder={t("enter_first_name")}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1"
            >
              {t("last_name")}
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              placeholder={t("enter_last_name")}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t("emailAddress")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("emailAddress")}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-[#644FC1] text-xs mt-1">{t("email_note")}</p>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("password")}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder={t("passwordPlaceholder")}
              defaultValue=""
              className="w-full border px-3 py-3 rounded-md focus:ring-purple-500 focus:border-purple-500 pr-10"
            />

            {showPassword ? (
              <FaEyeSlash
                className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(true)}
              />
            )}

            <Link
              href="/auth/Forgotpassword"
              className="text-xs text-purple-700 hover:underline mt-2 inline-block"
            >
              {t("forgotPassword")}
            </Link>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors.password.message || "")}
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
          >
            {isSubmitting ? t("signing_up") : t("continue")}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          {t("already_have_account")}
          <Link
            href="/auth/login"
            className="text-purple-700 ml-1 hover:underline font-medium"
          >
            {t("login")}
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

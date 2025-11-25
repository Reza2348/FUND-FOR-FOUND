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
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);
const GoogleLoginComponent = dynamic(
  () => import("@/components/GoogleLoginComponent/GoogleLoginComponent"),
  { ssr: false }
);

const loginSchema = z.object({
  identifier: z.string().min(1, "emailRequired").email("invalidEmail"),
  password: z.string().min(6, "passwordMinLength"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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

      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email: identifier,
          password,
        }
      );

      if (error) throw error;
      if (!loginData?.user) throw new Error("userNotFound");

      toast.success(t("loginSuccess"));

      timerRef.current = setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "unexpectedError";
      toast.error(t(errorMessage));
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-xs w-full">
        <div className="flex justify-center items-center h-20 mb-8">
          <Image src="/Vector.svg" alt="logo" width={50} height={50} priority />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-800">
          {t("appTitle")}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {t("createAccountOrSignIn")}
        </p>

        <GoogleLoginComponent className="w-full flex items-center justify-center border border-gray-300 bg-gray-50 text-gray-700 py-3 rounded-md mb-4 hover:bg-gray-100 transition duration-150 cursor-pointer">
          <FaGoogle className="w-5 h-5 mr-2 ml-3" />
          <span>{t("continueWithGoogle")}</span>
        </GoogleLoginComponent>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">
            {t("or")}
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("emailAddress")}
            </label>
            <input
              id="identifier"
              type="text"
              {...register("identifier")}
              placeholder={t("emailPlaceholder")}
              defaultValue=""
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors.identifier.message || "")}
              </p>
            )}
          </div>

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
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 pr-10"
            />

            {mounted &&
              (showPassword ? (
                <FaEyeSlash
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(true)}
                />
              ))}

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
            {isSubmitting ? t("loggingIn") : t("continue")}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          {t("dontHaveAccount")}
          <Link
            href="/auth/signup"
            className="text-purple-700 ml-1 font-medium hover:underline"
          >
            {t("createAccount")}
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient"; // مسیردهی به فایل supabaseClient خود را بررسی کنید
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link"; // برای لینک "back to login" و "Create an account"
import { CiLock } from "react-icons/ci";

// طرح‌واره (Schema) اعتبارسنجی برای ایمیل/شماره موبایل
const forgotPasswordSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "لطفاً ایمیل یا شماره موبایل خود را وارد کنید")
    .refine(
      (value) => {
        // اعتبار سنجی ساده برای ایمیل یا شماره موبایل
        // می‌تواند با regex های دقیق‌تر بهبود یابد
        return (
          z.string().email().safeParse(value).success ||
          /^\+?\d{10,15}$/.test(value) // مثال: برای شماره موبایل
        );
      },
      {
        message: "فرمت ایمیل یا شماره موبایل صحیح نیست",
      }
    ),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      const { emailOrPhone } = data;
      let error = null;

      // Supabase به طور خودکار تشخیص می‌دهد که ورودی ایمیل است یا شماره تلفن
      const isEmail = z.string().email().safeParse(emailOrPhone).success;

      if (isEmail) {
        // ارسال لینک بازنشانی رمز عبور به ایمیل
        const { error: emailError } = await supabase.auth.resetPasswordForEmail(
          emailOrPhone,
          {
            redirectTo: `${window.location.origin}/auth/update-password`, // مسیری که کاربر پس از کلیک بر روی لینک به آن هدایت می‌شود
          }
        );
        error = emailError;
      } else {
        // Supabase در حال حاضر (تا زمان نگارش این کد) تابع مستقیمی برای `resetPasswordForPhone` ندارد
        // برای بازنشانی رمز عبور از طریق SMS نیاز به پیاده‌سازی بک‌اند کاستوم دارید.
        // برای سادگی و مطابقت با Supabase auth، فعلاً بر روی ایمیل تمرکز می‌کنیم.
        // اگر شماره موبایل تنها راه ورود است، باید جریان متفاوتی برای OTP پیاده کنید.
        toast.error(
          "بازنشانی رمز عبور از طریق شماره موبایل در حال حاضر پشتیبانی نمی‌شود. لطفاً از ایمیل استفاده کنید."
        );
        return;
      }

      if (error) throw error;

      toast.success(
        "لینک بازنشانی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی خود را بررسی کنید."
      );
      // نیازی به هدایت فوری نیست، کاربر باید ایمیل را چک کند
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "خطای ناشناخته‌ای رخ داد.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4">
      <div className="max-w-md w-full p-8 rounded-lg  flex flex-col items-center">
        <div className="mb-6">
          <CiLock size={70} className="text-[#D7CFF9]" />
        </div>

        <h2 className="text-2xl font-bold text-[#644FC1] text-center mb-2">
          Trouble with logging in ?
        </h2>
        <p className="text-sm text-[#444444] text-center mb-6">
          Enter your email address or phone number and we'll <br />
          send you a link to get back into your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="emailOrPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile number or email address
            </label>
            <input
              id="emailOrPhone"
              type="text" // می‌تواند 'email' باشد اگر فقط ایمیل مجاز است
              {...register("emailOrPhone")}
              placeholder="youremail@yahoo.com or 0912326578"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
            />
            {errors.emailOrPhone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailOrPhone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            } transition-colors duration-200`}
          >
            {isSubmitting ? "در حال ارسال..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center justify-between w-full mt-6 mb-4">
          <span className="w-full border-b border-gray-300"></span>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <span className="w-full border-b border-gray-300"></span>
        </div>

        <Link
          href="/auth/signup"
          className="text-sm font-medium text-purple-600 hover:text-purple-500"
        >
          Create an account
        </Link>
        <Link
          href="/auth/login"
          className="text-sm text-gray-500 hover:text-gray-700 mt-2"
        >
          back to login
        </Link>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

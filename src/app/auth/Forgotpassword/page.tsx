"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "پسورد باید حداقل 6 کاراکتر باشد"),
    confirmPassword: z.string().min(6, "لطفا تکرار پسورد را وارد کنید"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "پسورد و تکرار پسورد باید یکسان باشند",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;

      toast.success("پسورد شما با موفقیت تغییر یافت!");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err: any) {
      toast.error(err.message || "خطای ناشناخته رخ داد");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">تغییر رمز عبور</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              پسورد جدید
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              تکرار پسورد
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "در حال تغییر..." : "تغییر رمز عبور"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

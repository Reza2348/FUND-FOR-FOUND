"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { CiLock } from "react-icons/ci";

const forgotPasswordSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Please enter your email or mobile number")
    .refine(
      (value) => {
        return (
          z.string().email().safeParse(value).success ||
          /^\+?\d{10,15}$/.test(value)
        );
      },
      {
        message: "The email or mobile number format is not valid",
      }
    ),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
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

      const isEmail = z.string().email().safeParse(emailOrPhone).success;

      if (isEmail) {
        const { error: emailError } = await supabase.auth.resetPasswordForEmail(
          emailOrPhone,
          {
            redirectTo: `${window.location.origin}/auth/update-password`,
          }
        );
        error = emailError;
      } else {
        toast.error("Sent to email");
        return;
      }

      if (error) throw error;

      toast.success(
        "A password reset link has been sent to your email. Please check your inbox."
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-lg  flex flex-col items-center">
        <div className="mb-6 flex justify-center items-center h-full">
          <CiLock size={70} className="text-[#D7CFF9]" />
        </div>

        <h2 className="text-2xl font-bold text-[#644FC1] text-center mb-2">
          Trouble with logging in ?
        </h2>
        <p className="text-sm text-[#444444] text-center mb-6">
          Enter your email address or phone number and we&apos;ll <br /> send
          you a link to get back into your account
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
              type="text"
              {...register("emailOrPhone")}
              placeholder="example@email.com / 0912345678"
              className="w-full border border-[#8D75F7] rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 text-sm placeholder:text-gray-400 placeholder:text-[13px] sm:placeholder:text-[14px]"
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
            {isSubmitting ? "Sending..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center justify-between w-full mt-6 mb-4">
          <span className="w-full border-b border-gray-300"></span>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <span className="w-full border-b border-gray-300"></span>
        </div>

        <div className="text-center flex flex-col items-center">
          <Link
            href="/auth/signup"
            className="text-sm font-medium text-purple-600 hover:text-purple-500 mb-2"
          >
            Create an account
          </Link>
          <Link
            href="/auth/login"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            back to login
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

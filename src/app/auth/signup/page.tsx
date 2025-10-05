"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

// ----------------- Schema اعتبارسنجی -----------------
const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobileNumber: z.string().min(10, "Mobile number is not valid"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

// ----------------- کامپوننت ثبت‌نام -----------------
export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const { username, email, password, mobileNumber } = data;

      // ----------------- 1️⃣ ثبت‌نام در Supabase Auth -----------------
      const { data: userData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, phone: mobileNumber }, // user_metadata
        },
      });

      if (authError) throw authError;

      // ----------------- 2️⃣ ذخیره در جدول profiles -----------------
      if (userData.user?.id) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            user_id: userData.user.id,
            username,
            phone: mobileNumber,
            email, // ایمیل را اضافه کنید
          },
        ]);
        if (profileError) throw profileError;
      }

      // ----------------- 3️⃣ نمایش پیام موفقیت -----------------
      toast.success(
        "Registration successful! Please check your email to confirm."
      );

      // ----------------- 4️⃣ هدایت به صفحه ورود بعد از 1.5 ثانیه -----------------
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.message || "خطای ناشناخته رخ داد");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              {...register("username")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobileNumber" className="block font-medium mb-1">
              Mobile number
            </label>
            <input
              id="mobileNumber"
              type="text"
              {...register("mobileNumber")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-orange-500 ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
        <p className="text-center mt-4 text-sm">
          Did you forget your password?
          <Link
            href="/auth/Forgotpassword"
            className="text-orange-500 ml-1 hover:underline"
          >
            Forgot password
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

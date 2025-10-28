// src/components/GoogleLoginComponent/GoogleLoginComponent.tsx
"use client";
import React from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * کامپوننت قابل استفاده مجدد برای ورود با گوگل از طریق Supabase OAuth.
 * استایل و محتوای دکمه از کامپوننت والد (SignUpPage) دریافت می‌شود.
 */
const GoogleLoginComponent = ({ className, children }) => {
  const handleGoogleSignIn = async () => {
    try {
      // استفاده از متد signInWithOAuth برای ورود با گوگل
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // آدرس URL پس از ورود موفق
          redirectTo: "http://localhost:3000/dashboard", // یا آدرس سایت شما
        },
      });

      if (error) {
        console.error("خطا در شروع ورود با گوگل:", error.message);
        alert("خطا در ورود: " + error.message);
      } else {
        console.log(
          "درخواست ورود با گوگل با موفقیت ارسال شد. کاربر به گوگل ریدایرکت می‌شود."
        );
      }
    } catch (err) {
      console.error("خطای غیرمنتظره:", err);
      alert("خطای غیرمنتظره در ورود: " + err.message);
    }
  };

  return (
    // 👈 تغییر از <button> به <div> برای رفع خطای Hydration
    <div
      onClick={handleGoogleSignIn}
      className={className} // اعمال استایل‌های دریافتی از والد
      // افزودن ویژگی‌های دسترسی (Accessibility) برای عملکرد دکمه
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleGoogleSignIn();
        }
      }}
    >
      {children} {/* رندر محتوای داخل دکمه (مثلاً آیکون و متن) */}
    </div>
  );
};

export default GoogleLoginComponent;

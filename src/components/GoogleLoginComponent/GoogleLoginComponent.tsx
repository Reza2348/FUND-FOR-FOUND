"use client";
import React, { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

interface GoogleLoginComponentProps {
  className?: string;
  children?: ReactNode;
}

const GoogleLoginComponent: React.FC<GoogleLoginComponentProps> = ({
  className,
  children,
}) => {
  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/dashboard",
        },
      });

      if (error) {
        console.error("خطا در شروع ورود با گوگل:", error.message);
        alert("خطا در ورود: " + error.message);
      } else {
        console.log("درخواست ورود با گوگل با موفقیت ارسال شد.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("خطای غیرمنتظره:", err.message);
        alert("خطای غیرمنتظره در ورود: " + err.message);
      } else {
        console.error("خطای غیرمنتظره:", err);
        alert("خطای ناشناخته در ورود");
      }
    }
  };

  return (
    <div
      onClick={handleGoogleSignIn}
      className={className}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleGoogleSignIn();
      }}
    >
      {children}
    </div>
  );
};

export default GoogleLoginComponent;

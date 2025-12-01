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
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/`
          : undefined;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error("Error starting Google login:", error.message);
        alert("Login error:" + error.message);
      } else {
        console.log("Google login request sent successfully.");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Unexpected error:", err.message);
        alert("Unexpected error while logging in:" + err.message);
      } else {
        console.error("Unexpected error:", err);
        alert("Unknown error during login");
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

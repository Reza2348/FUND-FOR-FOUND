import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { saveToken, removeToken } from "@/utils/isAuth";
// 💡 FIX: Import the necessary types from the Supabase client library
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface User {
  email: string;
  password: string;
}

// ✅ FIX: Use Supabase's defined types for User and Session
interface SignupResponse {
  user: SupabaseUser | null;
  session: Session | null;
  error: null;
}

// === Hook Definition ===
// Type Argument: <SuccessData, ErrorType, VariablesType>
export const useSignup = (): UseMutationResult<SignupResponse, Error, User> =>
  useMutation({
    mutationKey: ["signup"],
    mutationFn: async (user: User) => {
      // Supabase's signUp returns data.user and data.session
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (error) throw error; // If there's an error, TanStack Query handles it via onError

      // Return the typed data structure
      return { user: data.user, session: data.session, error: null };
    },

    onSuccess: (data) => {
      if (data.session?.access_token) {
        saveToken(data.session.access_token);
        console.log("User signed up and logged in successfully.");
      }
    },

    onError: (error) => {
      removeToken();
      console.error("Sign-up failed:", error);
    },
  });

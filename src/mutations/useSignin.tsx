import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { saveToken, removeToken } from "@/utils/isAuth";
// 💡 NEW: Import the specific types from the Supabase client library
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface User {
  email: string;
  password: string;
}

// ✅ FIX: Use Supabase's defined types for User and Session
interface SigninResponse {
  user: SupabaseUser | null;
  session: Session | null;
  error: null; // The mutationFn logic ensures this is always null on success
}

// === Hook Definition ===
// Type Argument: <SuccessData, ErrorType, VariablesType>
export const useSignIn = (): UseMutationResult<SigninResponse, Error, User> =>
  useMutation({
    mutationKey: ["signin"],
    mutationFn: async (user: User) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) throw error;

      // The `data` here contains Supabase's typed User and Session objects
      return { user: data.user, session: data.session, error: null };
    },

    onSuccess: (data) => {
      if (data.session?.access_token) {
        saveToken(data.session.access_token);
        console.log("User signed in successfully.");
      }
    },

    onError: (error) => {
      removeToken();
      console.error("Sign-in failed:", error);
    },
  });

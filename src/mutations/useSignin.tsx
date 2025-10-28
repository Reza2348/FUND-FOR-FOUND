import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { saveToken, removeToken } from "@/utils/isAuth";

interface User {
  email: string;
  password: string;
}

interface SigninResponse {
  user: any | null;
  session: any | null;
  error: any | null;
}

// === Hook Definition ===
export const useSignIn = (): UseMutationResult<SigninResponse, Error, User> =>
  useMutation({
    mutationKey: ["signin"],
    mutationFn: async (user: User) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) throw error;

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

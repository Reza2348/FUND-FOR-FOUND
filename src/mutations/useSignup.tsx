import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { saveToken, removeToken } from "@/utils/isAuth";

interface User {
  email: string;
  password: string;
}

interface SignupResponse {
  user: any | null;
  session: any | null;
  error: any | null;
}

// === Hook Definition ===
export const useSignup = (): UseMutationResult<SignupResponse, Error, User> =>
  useMutation({
    mutationKey: ["signup"],
    mutationFn: async (user: User) => {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (error) throw error;

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

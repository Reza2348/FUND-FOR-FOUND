import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export function useUser(idleTime = 20000) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (status !== "authenticated") {
      timerRef.current = setTimeout(() => {
        router.push("/auth/login");
      }, idleTime);
    }
  }, [status, idleTime, router]);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;

      if (data.user) {
        setUser(data.user);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");
        resetTimer();
      }
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          setUser(session.user);
          setStatus("authenticated");
          if (timerRef.current) clearTimeout(timerRef.current);
        } else {
          setUser(null);
          setStatus("unauthenticated");
          resetTimer();
        }
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  useEffect(() => {
    if (status === "authenticated") return;

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    const activityHandler = () => resetTimer();

    events.forEach((e) => window.addEventListener(e, activityHandler));

    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, activityHandler));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [status, resetTimer]);

  return { user, userId: user?.id ?? null, status };
}

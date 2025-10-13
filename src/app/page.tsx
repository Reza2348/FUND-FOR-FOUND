"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { IoBriefcaseOutline } from "react-icons/io5";
import Link from "next/link";
import { User } from "@supabase/supabase-js"; // Import the User type from Supabase

export default function Home() {
  // ✅ FIX: Replaced 'any' with the specific User type from Supabase (Line 11)
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      // Listener will only be undefined if the initial call failed, which is handled gracefully by Supabase's auth implementation.
      // We check for existence before unsubscribing to avoid runtime errors in some Next.js environments.
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleStartClick = () => {
    if (user) {
      router.push("/form/step-1");
    } else {
      router.push("/auth/login");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-[#270F94] mb-4 mt-11">
        Create your profile and take the first step towards new opportunities
      </h1>
      <p className="text-[#717171] max-w-xl mb-8">
        {/* ✅ FIX: Replaced ' with &apos; (Line 56 & 59) */}
        By creating your account, you&apos;ll gain access to a thriving
        community where brands and individuals are committed to offering you
        ongoing support. This support network will empower you with the
        resources, guidance, and connections you need to succeed, ensuring that
        you&apos;re never alone on your journey.
      </p>

      <div
        className="
 w-full max-w-[319px] h-auto min-h-[459px]
 border border-gray-300 text-[#644FC1]
 rounded-md shadow-sm p-6 sm:p-8
 flex flex-col items-center justify-between text-center bg-white mx-auto
 transition-all duration-300
"
      >
        <div className="flex flex-col items-center">
          <div className="p-4 sm:p-5 bg-[#F0EDFF] rounded-full mb-4 sm:mb-6">
            <IoBriefcaseOutline
              size={32}
              className="text-[#644FC1] sm:size-[36px]"
            />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-[#644FC1] mb-2">
            Brand or organization
          </h2>

          <p className="text-sm text-gray-600 mb-6 px-2 sm:px-4 leading-relaxed">
            {/* ✅ FIX: Replaced ' with &apos; (Line 85) */}
            If your brand is established and you&apos;re looking for continuous
            support, get started now.
          </p>
        </div>

        <div className="w-full">
          <button
            onClick={handleStartClick}
            className="bg-[#5C4FC1] text-white px-6 py-2 sm:py-3 rounded-md hover:bg-blue-900 transition w-full text-sm sm:text-base cursor-pointer"
          >
            Start
          </button>

          <Link
            href="/explore"
            className="block mt-4 text-sm text-gray-500 underline hover:text-gray-700"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

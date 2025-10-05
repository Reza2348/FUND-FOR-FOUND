"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // بررسی وضعیت کاربر هنگام بارگذاری صفحه
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    fetchUser();

    // گوش دادن به تغییرات وضعیت ورود کاربر
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleStartClick = () => {
    if (user) {
      router.push("/form/step-1"); // کاربر وارد شده → مرحله اول فرم
    } else {
      router.push("/auth/login"); // کاربر وارد نشده → صفحه ورود/ثبت‌نام
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
        Create your profile and take the first step towards new opportunities
      </h1>
      <p className="text-gray-600 max-w-xl mb-8">
        By creating your account, you'll gain access to a thriving community
        where brands and individuals are committed to offering you ongoing
        support.
      </p>

      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-8 w-full max-w-sm">
        <div className="text-4xl mb-4 text-blue-700">💼</div>
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Brand or organization
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          If your brand is established and you're looking for continuous
          support, get started now.
        </p>
        <button
          onClick={handleStartClick}
          className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900 transition"
        >
          Start
        </button>
        <a
          href="#"
          className="block mt-4 text-sm text-gray-500 underline hover:text-gray-700"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}

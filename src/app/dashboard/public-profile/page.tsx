"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaRegUser } from "react-icons/fa";

import BrandsContent from "@/components/BrandsContent/BrandsContent";
import ContributionsContent from "@/components/ContributionsContent/ContributionsContent";
import AboutContent from "@/components/AboutContent/AboutContent";

export default function ProfilePage() {
  const [userName, setUserName] = useState<string>("Guest");
  const [tab, setTab] = useState<"brands" | "contributions" | "about">(
    "brands"
  );

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !currentUser) return;

      // ابتدا سعی می‌کنیم نام از جدول profile بگیریم
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      // اگر موجود نبود، از گوگل یا user_metadata استفاده کنیم
      const name =
        profile?.first_name ||
        (currentUser.user_metadata as any)?.full_name || // OAuth گوگل
        currentUser.email?.split("@")[0] || // fallback ایمیل
        "Guest";

      setUserName(name);
    };
    fetchUserName();
  }, []);

  const renderTabContent = () => {
    switch (tab) {
      case "brands":
        return <BrandsContent />;
      case "contributions":
        return <ContributionsContent />;
      case "about":
        return <AboutContent />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto lg:ml-3 mt-3 w-full sm:w-11/12 md:w-4/5 lg:w-5xl xl:w-6xl bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <header
        className="relative text-white pt-6 px-4 sm:px-6 h-[160px] sm:h-48 lg:h-64"
        style={{
          background: "linear-gradient(135deg, #a491de 0%, #6c5be7 100%)",
        }}
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-wider mt-6 sm:mt-16">
          USER PROFILE
        </h2>
        <div className="absolute bottom-4 right-4 sm:right-6 flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0 text-xs sm:text-sm opacity-90">
          <p>Created 1 Brand</p>
          <p>Contributed 2 Brands</p>
        </div>
      </header>

      <div className="relative px-4 sm:px-6 -mt-14 sm:-mt-16 pb-4 flex items-end">
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-purple-300 rounded-full shadow-lg border-4 border-white flex-shrink-0 z-10 flex justify-center items-center">
          <FaRegUser size={50} className="text-white sm:text-4xl" />
        </div>
        <div className="ml-3 sm:ml-6 flex-grow flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 sm:pt-16">
          <span className="text-lg sm:text-xl font-bold text-gray-800 pt-6">
            {userName}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <nav className="border-b border-gray-200 mt-2 px-4 sm:px-6 overflow-x-auto">
        <div className="flex space-x-4 sm:space-x-8 min-w-max ml-2">
          {["brands", "contributions", "about"].map((t) => (
            <a
              key={t}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTab(t as "brands" | "contributions" | "about");
              }}
              className={`py-3 text-sm sm:text-base font-semibold uppercase tracking-wide transition duration-150 ease-in-out whitespace-nowrap ${
                tab === t
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300"
              }`}
            >
              {t === "brands" ? (
                <>
                  BRAND OR
                  <br className="md:hidden" />
                  ORGANIZATIONS
                </>
              ) : (
                t.toUpperCase()
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 text-gray-700">{renderTabContent()}</div>
    </div>
  );
}

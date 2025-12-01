"use client";

import React, { PropsWithChildren, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "react-i18next";
import { AiOutlineWarning } from "react-icons/ai";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userId, status } = useUser();
  const { t } = useTranslation();

  if (status === "loading") {
    return <div className="p-5 text-gray-600">{t("Loading...")}</div>;
  }

  if (status === "unauthenticated" || !userId) {
    return (
      <div className="flex items-center p-4 mt-4 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-sm">
        <AiOutlineWarning className="w-6 h-6 mr-2 flex-shrink-0" />
        <span className="text-sm md:text-base">
          {t("You must be logged in to view your dashboard.")}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className="flex-1 overflow-y-auto p-4 md:p-8"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        {children}
      </main>
    </div>
  );
}

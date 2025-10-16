// app/dashboard/layout.tsx
"use client";
import React, { PropsWithChildren, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main onClick={() => sidebarOpen && setSidebarOpen(false)}>
        {children}
      </main>
    </div>
  );
}

import Sidebar from "@/components/Sidebar/Sidebar";
import React, { PropsWithChildren } from "react";

export const metadata = {
  title: "Dashboard - Fund For Found",
};

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="px-6 py-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;

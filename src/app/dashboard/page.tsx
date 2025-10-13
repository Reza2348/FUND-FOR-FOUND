import React from "react";

// این صفحه نباید ریدایرکت کند. اجازه دهید Middleware کار را انجام دهد.
export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700">
        لطفاً صبر کنید... در حال هدایت به بخش پروفایل عمومی.
      </h1>
    </div>
  );
}

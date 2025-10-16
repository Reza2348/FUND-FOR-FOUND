"use client";
import React from "react";

const DashboardContentPage = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-inner min-h-[60vh]">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        خوش آمدید! محتوای اصلی صفحه
      </h3>
      <p className="text-gray-600">
        این بخش توسط فایل app/dashboard/page.tsx رندر شده است و در داخل تگ main
        در layout.tsx قرار دارد.
      </p>

      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-indigo-50/50">
        <p className="text-sm font-medium text-indigo-700">
          برای دیدن صفحات دیگر، روی لینک‌های سایدبار کلیک کنید.
        </p>
      </div>
    </div>
  );
};

export default DashboardContentPage;

"use client"; // 🟢 این فایل همچنان باید Client Component باشد تا بتواند محتوای پویا داشته باشد.
import React from "react";

/**
 * این کامپوننت، محتوای اصلی صفحه /dashboard/[slug] را نمایش می دهد.
 * این کامپوننت به عنوان 'children' در DashboardLayout رندر می شود،
 * بنابراین نباید Sidebar را مجدداً فراخوانی کند.
 */
const DashboardContentPage = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-inner min-h-[60vh]">
      {/* 💡 توجه: محتوای اصلی هر صفحه (مانند Info, About, Team) باید اینجا قرار گیرد.
        Sidebar و Layout در حال حاضر نمایش داده شده‌اند.
      */}

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

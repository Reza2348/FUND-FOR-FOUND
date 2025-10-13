"use client";

import React from "react";

interface DashboardSectionPageProps {
  params: Promise<{
    section?: string | string[];
  }>;
}

export default function DashboardSectionPage({
  params,
}: DashboardSectionPageProps) {
  const resolvedParams = React.use(params);

  // اگر section موجود نبود، Public profile پیش‌فرض باشد
  const section: string = Array.isArray(resolvedParams.section)
    ? resolvedParams.section[0]
    : resolvedParams.section || "public-profile";

  const renderContent = () => {
    switch (section) {
      case "public-profile":
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            این بخش پروفایل عمومی کاربر است.
          </div>
        );
      case "info":
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            این بخش اطلاعات پروژه را نشان می‌دهد.
          </div>
        );
      case "about":
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            این بخش درباره پروژه یا تیم است.
          </div>
        );
      case "team":
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            این بخش اعضای تیم را نمایش می‌دهد.
          </div>
        );
      case "updates":
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            این بخش آخرین آپدیت‌ها را نمایش می‌دهد.
          </div>
        );
      case "expenses":
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            این بخش هزینه‌ها را نمایش می‌دهد.
          </div>
        );
      case "payout":
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            این بخش پرداخت‌ها را نمایش می‌دهد.
          </div>
        );
      default:
        return (
          <div className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl">
            لطفاً یک بخش از منو انتخاب کنید.
          </div>
        );
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8 md:py-10 lg:py-12 max-w-5xl mx-auto space-y-4">
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold capitalize mb-4">
        {section.replace("-", " ")}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

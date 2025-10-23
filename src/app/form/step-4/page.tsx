"use client";

// Link حذف شد و به تگ <a> استاندارد تغییر کرد تا مشکل resolve نشدن در محیط ایزوله حل شود
import { useState } from "react";

export default function StepFourPage() {
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  // تابع handleSubmit برای تعاملات سمت کلاینت تعریف شده است
  const handleSubmit = () => {
    // ۱. جمع‌آوری تمام داده‌های فرم
    // ۲. ارسال نهایی داده‌ها به سرور (API)
    // ۳. هدایت کاربر به صفحه موفقیت (در این شبیه‌سازی، نمایش پیام)

    // شبیه سازی ارسال موفقیت آمیز
    setSubmissionStatus("success");

    // در یک برنامه واقعی، شما ممکن است از router.push استفاده کنید:
    // router.push('/form/success');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        مرحله 4: تأیید و ارسال نهایی
      </h2>
      <p className="text-gray-600">
        لطفاً اطلاعات خود را بازبینی کنید و برای ثبت نهایی روی دکمه ارسال کلیک
        کنید.
      </p>

      {/* نمایش پیام وضعیت ارسال */}
      {submissionStatus === "success" && (
        <div className="p-4 rounded-lg bg-green-100 text-green-700 font-medium border border-green-200 shadow-sm">
          ✅ فرم با موفقیت ارسال شد و عملیات شبیه‌سازی پایان یافت!
        </div>
      )}

      {/* خلاصه اطلاعات ورودی (باید از Context/Global State گرفته شود) */}
      <div className="border p-4 rounded-xl bg-gray-50 text-gray-800 shadow-inner">
        <strong className="block mb-2 text-lg">خلاصه داده‌های شما:</strong>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <span className="font-semibold">نام:</span> [Placeholder - باید از
            استیت مرکزی پر شود]
          </li>
          <li>
            <span className="font-semibold">آدرس:</span> [Placeholder - باید از
            استیت مرکزی پر شود]
          </li>
          <li>
            <span className="font-semibold">تنظیمات:</span> [Placeholder - باید
            از استیت مرکزی پر شود]
          </li>
        </ul>
        <p className="mt-4 text-xs italic text-gray-500">
          توجه: این فیلدها در حال حاضر فقط متغیرهای پیش‌فرض هستند و باید به
          داده‌های واقعی فرم متصل شوند.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        {/* لینک به مرحله قبلی - تغییر داده شد به تگ <a> */}
        <a
          href="/form/step-3"
          className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg transition duration-150 ease-in-out shadow-md hover:shadow-lg"
        >
          &larr; قبلی
        </a>

        {/* دکمه ارسال نهایی */}
        <button
          onClick={handleSubmit}
          disabled={submissionStatus === "success"}
          className={`
            inline-flex items-center font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg 
            ${
              submissionStatus === "success"
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white hover:scale-[1.02]"
            }
          `}
        >
          تأیید و ارسال فرم
        </button>
      </div>
    </div>
  );
}

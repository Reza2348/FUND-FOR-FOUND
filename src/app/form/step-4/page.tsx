"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ✅ اضافه کردن Interface برای رفع خطای 'any'
interface Brand {
  id: number | string; // id می‌تواند number یا string باشد، بسته به API شما
  name: string;
  description: string;
}

export default function StepFourPage() {
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  // ✅ اصلاح خط 8: جایگزینی any[] با Brand[]
  const [brands, setBrands] = useState<Brand[]>([]);
  const router = useRouter();

  // ... بقیه کد ...

  // تابع handleSubmit برای تعاملات سمت کلاینت تعریف شده است
  const handleSubmit = () => {
    // شبیه‌سازی ارسال موفقیت آمیز
    setSubmissionStatus("success");

    // هدایت به صفحه موفقیت بعد از ارسال
    setTimeout(() => {
      router.push("/form/success");
    }, 1500);
  };

  // تابع برای دریافت داده‌ها از API
  const fetchBrands = async () => {
    try {
      const response = await fetch("/api/brands"); // مسیر API برای دریافت داده‌ها از جدول 'brands'
      if (response.ok) {
        // داده‌های دریافتی به طور خودکار به نوع Brand[] اختصاص می‌یابد
        const data: Brand[] = await response.json();
        setBrands(data); // ذخیره داده‌های برندها
      } else {
        console.error("خطا در دریافت داده‌ها");
      }
    } catch (error) {
      console.error("خطا در برقراری ارتباط با سرور:", error);
    }
  };

  // استفاده از useEffect برای بارگذاری داده‌ها هنگام بارگذاری صفحه
  useEffect(() => {
    fetchBrands();
  }, []);

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
            <span className="font-semibold">نام:</span> [نام واقعی باید از استیت
            مرکزی پر شود]
          </li>
          <li>
            <span className="font-semibold">آدرس:</span> [آدرس واقعی باید از
            استیت مرکزی پر شود]
          </li>
          <li>
            <span className="font-semibold">تنظیمات:</span> [تنظیمات واقعی باید
            از استیت مرکزی پر شود]
          </li>
        </ul>
        <p className="mt-4 text-xs italic text-gray-500">
          توجه: این فیلدها در حال حاضر فقط متغیرهای پیش‌فرض هستند و باید به
          داده‌های واقعی فرم متصل شوند.
        </p>
      </div>

      {/* نمایش برندها */}
      <div className="border p-4 rounded-xl bg-gray-50 text-gray-800 shadow-inner mt-4">
        <strong className="block mb-2 text-lg">برندهای موجود:</strong>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <li key={brand.id}>
                <span className="font-semibold">{brand.name}</span> -{" "}
                {brand.description}
              </li>
            ))
          ) : (
            <li>برندهایی وجود ندارند.</li>
          )}
        </ul>
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

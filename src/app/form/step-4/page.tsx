// form/step-4/page.tsx

import Link from "next/link";

export default function StepFourPage() {
  const handleSubmit = () => {
    // در یک برنامه واقعی:
    // ۱. جمع‌آوری تمام داده‌های فرم (از طریق State مدیریت شده در Layout یا یک Context)
    // ۲. ارسال نهایی داده‌ها به سرور (API)
    // ۳. هدایت کاربر به صفحه موفقیت
    alert("فرم با موفقیت ارسال شد! (این یک شبیه‌سازی است)");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">مرحله 4: تأیید و ارسال نهایی</h2>
      <p>
        لطفاً اطلاعات خود را بازبینی کنید و برای ثبت نهایی روی دکمه ارسال کلیک
        کنید.
      </p>

      {/* در اینجا باید یک Summary از داده‌های ورودی نمایش داده شود */}
      <div className="border p-4 rounded bg-yellow-50 text-yellow-800">
        **خلاصه:** نام: [نام وارد شده]، آدرس: [آدرس وارد شده]، ...
      </div>

      <div className="flex justify-between pt-4">
        {/* لینک به مرحله قبلی */}
        <Link
          href="/form/step-3"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          قبلی
        </Link>
        {/* دکمه ارسال نهایی */}
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          تأیید و ارسال فرم
        </button>
      </div>
    </div>
  );
}

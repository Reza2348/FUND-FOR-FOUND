// form/step-3/page.tsx

import Link from "next/link";

export default function StepThreePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mt-[74px]">
        مرحله 3: تنظیمات حساب کاربری
      </h2>
      <p>
        در این مرحله، تنظیمات دلخواه مانند رمز عبور یا ترجیحات کاربر ثبت می‌شود.
      </p>

      {/* مثال یک فیلد */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          رمز عبور
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="رمز عبور قوی"
        />
      </div>

      <div className="flex justify-between pt-4">
        {/* لینک به مرحله قبلی */}
        <Link
          href="/form/step-2"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          قبلی
        </Link>
        {/* لینک به مرحله بعدی */}
        <Link
          href="/form/step-4"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          بعدی
        </Link>
      </div>
    </div>
  );
}

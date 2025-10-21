// form/step-2/page.tsx

import Link from "next/link";

export default function StepTwoPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mt-[74px]">مرحله 2: جزئیات آدرس</h2>
      <p>این بخش برای جمع‌آوری اطلاعات آدرس و تماس است.</p>

      {/* مثال یک فیلد */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          آدرس
        </label>
        <textarea
          id="address"
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="خیابان، کوچه، پلاک"
        />
      </div>

      <div className="flex justify-between pt-4">
        {/* لینک به مرحله قبلی */}
        <Link
          href="/form/step-1"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          قبلی
        </Link>
        {/* لینک به مرحله بعدی */}
        <Link
          href="/form/step-3"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          بعدی
        </Link>
      </div>
    </div>
  );
}

// ProgressBar.tsx

import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface ProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep = 1,
  totalSteps = 4,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    // حذف max-w-9xl و mt-2 و اضافه کردن px-4 برای padding در موبایل
    <div className="mx-auto pt-6 px-4 sm:px-6">
      <div className="flex items-center justify-between pb-6">
        {/* دکمه بازگشت: حذف فاصله‌های ثابت و استفاده از کلاس‌های padding و margin ریسپانسیو */}
        <button className="p-2 transition duration-150 ease-in-out">
          {/* حذف mr-[25px] و ml-[29px] و استفاده از فضای داخلی دکمه */}
          {/* بهتر است دکمه به گام قبلی برگردد، نه روت اصلی (/) */}
          <Link
            href={`/form/step-${Math.max(1, currentStep - 1)}`}
            aria-label="مرحله قبلی"
          >
            <FaArrowLeft className="w-6 h-6 text-[#644FC1]" />
          </Link>
        </button>
        {/* کانتینر مراحل: مرکزیت و فاصله‌گذاری مناسب در موبایل */}
        {/* حذف pr-12 و استفاده از flex-1 برای پر کردن فضا */}
        <div className="flex items-center justify-center flex-1 max-w-md mx-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              {/* دایره مرحله */}
              <div
                className={`
                  w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300
                  ${
                    step <= currentStep
                      ? "bg-[#644FC1] text-white"
                      : "bg-white border-2 border-gray-300 text-gray-500"
                  }
                `}
              >
                {step}
              </div>

              {/* خط اتصال (Connector) */}
              {index < totalSteps - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-1 sm:mx-2 transition-colors duration-300 
                    max-w-[30px] sm:max-w-[50px]
                    ${index + 1 < currentStep ? "bg-[#644FC1]" : "bg-gray-300"}
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        {/* عنصر Spacer: حذف w-10 و استفاده از عرض دکمه بازگشت */}
        <div className="w-10 invisible"></div>{" "}
      </div>
    </div>
  );
};

export default ProgressBar;

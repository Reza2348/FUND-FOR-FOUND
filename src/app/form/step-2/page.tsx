"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SocialMediaSection } from "@/components/Social Media Links/Social Media Links";

// نوع داده برای مدیریت لینک‌های شبکه‌های اجتماعی
interface SocialLinks {
  instagram: string;
  linkedin: string;
  website: string;
  // می‌توانید فیلدهای بیشتری مانند twitter، facebook و... را اینجا اضافه کنید
}

export default function StepTwoPage() {
  // تغییر نام state از 'text' به 'description' برای وضوح بیشتر
  const [description, setDescription] = useState("");

  // 💡 افزودنی: State برای نگهداری داده‌های Social Media Section
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    instagram: "",
    linkedin: "",
    website: "",
  });

  const router = useRouter();

  // ==========================================================
  // 💡 افزودنی ۱: بازیابی داده‌ها از Local Storage (هنگام بارگذاری صفحه)
  // ==========================================================
  useEffect(() => {
    const savedData = localStorage.getItem("formStep2Data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        // بازیابی Description
        if (parsedData.description) {
          setDescription(parsedData.description);
        }

        // بازیابی Social Links
        if (parsedData.socialLinks) {
          setSocialLinks(parsedData.socialLinks);
        }
        console.log("Restored Form 2 data:", parsedData);
      } catch (e) {
        console.error("Error restoring Form 2 data from Local Storage", e);
      }
    }
  }, []);
  // ==========================================================

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // 💡 افزودنی: تابع موقتی برای مدیریت تغییرات در Social Links
  // این تابع باید به عنوان `prop` به SocialMediaSection ارسال شود.
  const handleSocialLinkChange = useCallback(
    (name: keyof SocialLinks, value: string) => {
      setSocialLinks((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // ==========================================================
  // 💡 افزودنی ۲: ذخیره داده‌ها در Local Storage (هنگام ادامه)
  // ==========================================================
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!description.trim()) {
        alert("Please fill out the description.");
        return;
      }

      // ۱. جمع‌آوری تمام داده‌ها
      const allStep2Data = {
        description: description,
        socialLinks: socialLinks,
      };

      // ۲. ذخیره داده‌های فرم ۲ در Local Storage
      try {
        localStorage.setItem("formStep2Data", JSON.stringify(allStep2Data));
        console.log("Form 2 data saved to Local Storage:", allStep2Data);
      } catch (error) {
        console.error("Could not save Form 2 to Local Storage", error);
        alert("خطا در ذخیره موقت داده‌ها. لطفا مجددا تلاش کنید.");
        return;
      }

      // ۳. هدایت به مرحله بعد
      router.push("/form/step-3");
    },
    [description, socialLinks, router]
  );
  // ==========================================================

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1 sm:space-y-8 lg:w-fit justify-start lg:justify-center lg:mx-auto">
        <h2 className="text-xl font-semibold sm:text-2xl text-[#644FC1]">
          Detailed info
        </h2>
        <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
          Description
        </label>
        <textarea
          value={description} // استفاده از description
          onChange={handleDescriptionChange} // استفاده از handleDescriptionChange
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 mt-2"
          rows={5}
          placeholder="Enter your text here"
        />
        <p className="mt-2 text-gray-500">{description.length} characters</p>
        {/* استفاده از description.length */}

        <div className="mb-6">
          <label className="block text-xl font-medium text-[#505050S] mb-1">
            Help your contributors find you faster (at least 3 options)
          </label>
          <p className="text-[#505050] mb-5">
            Connect your socials so the contributors get to know you better and
            find you faster
          </p>

          {/* بخش Social Media Section: 
                        **توجه:** اگر SocialMediaSection کامپوننت خارجی شماست، 
                        باید اطمینان حاصل کنید که تغییرات را با استفاده از prop به 
                        handleSocialLinkChange ارسال می‌کند.
                        برای نمونه، یک فیلد ساده در اینجا اضافه می‌کنم تا نشان دهم 
                        چگونه داده‌های socialLinks مدیریت می‌شوند.
                    */}

          {/* <SocialMediaSection 
                         socialLinks={socialLinks} 
                         onLinkChange={handleSocialLinkChange} 
                    /> */}

          {/* فیلد نمونه: Website URL */}

          <SocialMediaSection />
        </div>

        <div className="flex justify-start pt-6">
          <button
            type="submit"
            className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 w-full md:w-auto"
            disabled={!description.trim()} // استفاده از description.trim()
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}

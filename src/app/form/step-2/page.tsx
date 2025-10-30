"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
// اطمینان از وارد کردن صحیح کامپوننت و اینترفیس
import {
  SocialMediaSection,
  SocialLink,
} from "@/components/Social Media Links/Social Media Links";

// اینترفیس SocialLinks که قبلاً برای شیء ثابت استفاده می‌شد، حذف می‌شود.

export default function StepTwoPage() {
  const [description, setDescription] = useState("");

  // تعریف State برای لینک‌ها با ساختار آرایه‌ای
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { type: "Instagram", url: "" },
    { type: "LinkedIn", url: "" },
    { type: "Website", url: "" },
  ]);

  const router = useRouter();

  useEffect(() => {
    // Note: In a real app, you should replace localStorage with Firestore
    const savedData = localStorage.getItem("formStep2Data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);

        if (parsedData.description) {
          setDescription(parsedData.description);
        }

        // 💡 مهم: داده‌های قدیمی شیء ثابت (اگر وجود داشتند) به ساختار آرایه‌ای جدید تبدیل می‌شوند
        if (parsedData.socialLinks && Array.isArray(parsedData.socialLinks)) {
          setSocialLinks(parsedData.socialLinks);
        }
        console.log("Restored Form 2 data:", parsedData);
      } catch (e) {
        console.error("Error restoring Form 2 data from Local Storage", e);
      }
    }
  }, []);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // ❌ تابع handleSocialLinkChange حذف شده است، زیرا ما setSocialLinks را مستقیم پاس می‌دهیم.

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!description.trim()) {
        console.error("Please fill out the description.");
        return;
      }

      const allStep2Data = {
        description: description,
        socialLinks: socialLinks, // استفاده از آرایه لینک‌ها
      };

      try {
        localStorage.setItem("formStep2Data", JSON.stringify(allStep2Data));
        console.log("Form 2 data saved to Local Storage:", allStep2Data);
      } catch (error) {
        console.error("Could not save Form 2 to Local Storage", error);
        return;
      }

      router.push("/form/step-3");
    },
    [description, socialLinks, router]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1 sm:space-y-8 lg:w-fit justify-start lg:justify-center lg:mx-auto">
        <h2 className="text-xl font-semibold sm:text-2xl text-[#644FC1]">
          Detailed info
        </h2>

        {/* ... (بخش Description) ... */}

        <div className="mb-6">
          <label className="block text-xl font-medium text-[#505050S] mb-1">
            Help your contributors find you faster (at least 3 options)
          </label>

          <p className="text-[#505050] mb-5">
            Connect your socials so the contributors get to know you better and
            find you faster
          </p>

          {/* ✅ پاس دادن State و تابع به‌روزرسانی */}
          <SocialMediaSection
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        </div>
        <div className="flex justify-start pt-6">
          <button
            type="submit"
            className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 w-full md:w-auto"
            disabled={!description.trim()}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}

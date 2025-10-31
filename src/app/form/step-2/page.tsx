"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  SocialMediaSection,
  SocialLink,
} from "@/components/Social Media Links/Social Media Links";

export default function StepTwoPage() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState<string>("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { type: "Instagram", url: "" },
    { type: "Discord", url: "" },
    { type: "Website", url: "" },
  ]);
  const [errors, setErrors] = useState<{
    description?: string;
    socialLinks?: string;
  }>({});

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formStep2Data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setDescription(parsedData.description || "");
        setSocialLinks(parsedData.socialLinks || []);
      } catch (e) {
        console.error("Error restoring Form 2 data from Local Storage", e);
      }
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      if (!text.trim()) {
        console.error("New Text Input is empty. Cannot proceed.");
        return;
      }

      const allStep2Data = {
        description: description,
        socialLinks: socialLinks,
      };

      try {
        localStorage.setItem("formStep2Data", JSON.stringify(allStep2Data));
        console.log("Form 2 data saved to Local Storage:", allStep2Data);
        router.push("/form/step-3");
      } catch (error) {
        console.error("Could not save Form 2 to Local Storage", error);
      }
    },
    [text, description, socialLinks, router]
  );

  const isFormInvalid = !text.trim();

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1 sm:space-y-8 lg:w-fit justify-start lg:justify-center lg:mx-auto">
        <h2 className="text-xl font-semibold sm:text-2xl text-[#644FC1]">
          Detailed info
        </h2>

        <div className="mb-6">
          <label
            htmlFor="new-text"
            className="block text-xl font-medium text-[#505050] mb-2"
          >
            What is the primary mission or objective of your brand/organization?
          </label>
          <p className="mb-4 text-[#505050]">
            Be more specific about it, as it will br published as your deac on
            the 3F(150-300 characters).
            <span className="text-[#0881EA] ml-1">read more</span>
          </p>
          <textarea
            id="new-text"
            value={text}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 mt-2 focus:ring-[#644FC1] focus:border-[#644FC1]"
            rows={5}
            placeholder="Enter your text here"
          />
          <p className="mt-2 text-gray-500 text-sm **text-start**">
            Characters: <strong>{text.length}</strong>
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-xl font-medium text-[#505050] mb-1">
            Help your contributors find you faster (at least 3 options)
          </label>
          <p className="text-[#505050] mb-5 text-sm">
            Connect your socials so the contributors get to know you better and
            find you faster
          </p>
          <SocialMediaSection
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
          {errors.socialLinks && (
            <p className="text-red-500 text-sm">{errors.socialLinks}</p>
          )}
        </div>

        <div className="flex justify-start pt-6">
          <button
            type="submit"
            className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 w-full md:w-auto"
            disabled={isFormInvalid}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SocialMediaSection } from "@/components/Social Media Links/Social Media Links";

interface SocialLinks {
  instagram: string;
  linkedin: string;
  website: string;
}

export default function StepTwoPage() {
  const [description, setDescription] = useState("");

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    instagram: "",
    linkedin: "",
    website: "",
  });

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

        if (parsedData.socialLinks) {
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

  const handleSocialLinkChange = useCallback(
    (name: keyof SocialLinks, value: string) => {
      setSocialLinks((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Note: Do not use alert(). Replace this with a custom modal UI.
      if (!description.trim()) {
        console.error("Please fill out the description.");
        return;
      }

      const allStep2Data = {
        description: description,
        socialLinks: socialLinks,
      };

      try {
        localStorage.setItem("formStep2Data", JSON.stringify(allStep2Data));
        console.log("Form 2 data saved to Local Storage:", allStep2Data);
      } catch (error) {
        console.error("Could not save Form 2 to Local Storage", error);
        // Note: Do not use alert(). Replace this with a custom modal UI.
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

        <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
          Description
        </label>

        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 mt-2"
          rows={5}
          placeholder="Enter your text here"
        />

        <p className="mt-2 text-gray-500">{description.length} characters</p>

        <div className="mb-6">
          <label className="block text-xl font-medium text-[#505050S] mb-1">
            Help your contributors find you faster (at least 3 options)
          </label>

          <p className="text-[#505050] mb-5">
            Connect your socials so the contributors get to know you better and
            find you faster
          </p>
          {/* PASSING THE PROPS TO RESOLVE THE UNUSED VARIABLE WARNING */}
          <SocialMediaSection
            socialLinks={socialLinks}
            onSocialLinkChange={handleSocialLinkChange}
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

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SocialMediaSection } from "@/components/Social Media Links/Social Media Links"; // Import the SocialMediaSection component

export default function StepTwoPage() {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!text.trim()) {
        alert("Please fill out the description.");
        return;
      }
      console.log("Form data:", { text });
      router.push("/form/step-3");
    },
    [text]
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
          value={text}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 mt-2"
          rows={5}
          placeholder="Enter your text here"
        />
        <p className="mt-2 text-gray-500">{text.length} characters</p>

        <div className="mb-6">
          <label className="block text-xl font-medium text-[#505050S] mb-1">
            Help your contributors find you faster (at least 3 options)
          </label>
          <p className="text-[#505050] mb-5">
            Connect your socials so the contributors get to know you better and
            find you faster
          </p>
          <SocialMediaSection />
        </div>

        <div className="flex justify-start pt-6">
          <button
            type="submit"
            className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 w-full md:w-auto"
            disabled={!text.trim()}
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}

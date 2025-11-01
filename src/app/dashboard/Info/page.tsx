"use client";

import React, { useState } from "react";
import { HiX } from "react-icons/hi";

import {
  SocialMediaSection,
  SocialLink,
} from "@/components/Social Media Links/Social Media Links";

export default function InfoPage() {
  const [projectTags, setProjectTags] = useState<string[]>([
    "Product design",
    "design",
  ]);

  const [projectTitle, setProjectTitle] = useState("Wish work");
  const [country, setCountry] = useState("Canada");
  const [projectCategory, setProjectCategory] = useState("Product design");
  const [projectSubcategory, setProjectSubcategory] = useState("design");

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { type: "Instagram", url: "" },
    { type: "LinkedIn", url: "" },
    { type: "Website", url: "" },
  ]);

  const removeTag = (tag: string) =>
    setProjectTags(projectTags.filter((t) => t !== tag));

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl mx-auto lg:mt-[12px] lg:ml-[136px]">
      <div className="my-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
          <span className="text-[#644FC1] sm:mr-2 hidden md:inline">■</span>
          Info
        </h2>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Use the below code in your analysis for tracking your page
        </label>

        <input
          type="text"
          placeholder="3F-5000021100F545X57P0012"
          readOnly
          className="w-full border border-[#8D75F7] rounded-lg p-2 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link to your brand or organization
        </label>

        <input
          type="text"
          placeholder="http://fundforfound.com/brand/@chanelb"
          readOnly
          className="w-full border border-[#8D75F7] rounded-lg p-2 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1]"
        />
      </div>
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative w-full">
            <label
              htmlFor="project-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project title
            </label>

            <input
              id="project-title"
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="appearance-none w-full border border-[#8D75F7] rounded-lg p-3 pr-10 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1] bg-white"
            />
          </div>

          <div className="relative w-full">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="appearance-none w-full border border-[#8D75F7] rounded-lg p-3 pr-10 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1] bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative w-full">
            <label
              htmlFor="project-category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project category
            </label>

            <input
              id="project-category"
              type="text"
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              className="appearance-none w-full border border-[#8D75F7] rounded-lg p-3 pr-10 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1] bg-white"
            />
          </div>

          <div className="relative w-full">
            <label
              htmlFor="project-subcategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project subcategory
            </label>

            <input
              id="project-subcategory"
              type="text"
              value={projectSubcategory}
              onChange={(e) => setProjectSubcategory(e.target.value)}
              className="appearance-none w-full border border-[#8D75F7] rounded-lg p-3 pr-10 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1] bg-white"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project tags
        </label>

        <div className="flex flex-wrap gap-2 border border-[#8D75F7] rounded-lg p-2 focus-within:ring-1 focus-within:ring-[#644FC1] focus-within:border-[#644FC1]">
          {projectTags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <HiX size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <SocialMediaSection
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />
      </div>
    </div>
  );
}

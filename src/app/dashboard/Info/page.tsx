"use client";

import React, { useState, useCallback } from "react";
import { HiX, HiPlus } from "react-icons/hi";
import {
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
const socialMediaIcons: Record<string, React.ReactNode> = {
  Website: <FaGlobe className="text-gray-500" />,
  YouTube: <FaYoutube className="text-red-600" />,
  Instagram: <FaInstagram className="text-pink-600" />,
  Twitter: <FaTwitter className="text-blue-400" />,
  Discord: <FaDiscord className="text-indigo-500" />,
  WhatsApp: <FaWhatsapp className="text-green-500" />,
  Telegram: <FaTelegram className="text-blue-500" />,
  Facebook: <FaFacebook className="text-blue-700" />,
  LinkedIn: <FaLinkedin className="text-blue-600" />,
};

interface SocialLink {
  type: string;
  url: string;
}

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  label,
}) => (
  <div className="relative w-full">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>

    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="appearance-none w-full border border-[#8D75F7] rounded-lg p-3 pr-10 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1] bg-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <RiArrowDownSLine
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        size={20}
      />
    </div>
  </div>
);

interface SocialSelectProps {
  link: SocialLink;
  index: number;
  availableTypes: string[];
  updateType: (index: number, newType: string) => void;
}

const SocialSelect: React.FC<SocialSelectProps> = ({
  link,
  index,
  availableTypes,
  updateType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentIcon = socialMediaIcons[link.type];

  return (
    <div className="relative w-full sm:w-52 flex-shrink-0">
      <button
        type="button"
        className="flex items-center justify-between w-full border border-[#8D75F7] rounded-lg p-3 bg-white focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1] transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className="mr-2">{currentIcon}</span>
          <span className="text-gray-700 font-medium">{link.type}</span>
        </span>
        <RiArrowDownSLine size={20} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full sm:w-52 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
          {availableTypes.map((type) => (
            <div
              key={type}
              onClick={() => {
                updateType(index, type);
                setIsOpen(false);
              }}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              <span className="mr-3">{socialMediaIcons[type]}</span>
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function InfoPage() {
  const [projectTags, setProjectTags] = useState<string[]>([
    "Product design",
    "design",
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { type: "Instagram", url: "" },
    { type: "Discord", url: "" },
    { type: "Website", url: "" },
  ]);
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);

  const [projectTitle, setProjectTitle] = useState("Wish work");
  const [country, setCountry] = useState("Canada");
  const [projectCategory, setProjectCategory] = useState("Product design");
  const [projectSubcategory, setProjectSubcategory] = useState("design");

  const availableSocialTypes = Object.keys(socialMediaIcons);

  const removeTag = (tag: string) =>
    setProjectTags(projectTags.filter((t) => t !== tag));
  const removeSocialLink = (index: number) =>
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  const addSocialLink = (type: string) => {
    setSocialLinks([...socialLinks, { type, url: "" }]);
    setShowSocialDropdown(false);
  };
  const updateSocialLinkType = useCallback(
    (index: number, newType: string) => {
      setSocialLinks(
        socialLinks.map((link, i) =>
          i === index ? { ...link, type: newType } : link
        )
      );
    },
    [socialLinks]
  );
  const updateSocialLinkUrl = (index: number, newUrl: string) => {
    setSocialLinks(
      socialLinks.map((l, i) => (i === index ? { ...l, url: newUrl } : l))
    );
  };

  const usedSocialTypes = socialLinks.map((link) => link.type);
  const availableToAdd = availableSocialTypes.filter(
    (type) => !usedSocialTypes.includes(type)
  );

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
          Use the below code in your analysis for track your page
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
          Link to your brand or organisttion
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
          <CustomSelect
            id="project-title"
            name="projectTitle"
            label="Project title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            options={["Wish work", "Another project", "Third project"]}
          />
          <CustomSelect
            id="country"
            name="country"
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={["Canada", "USA", "UK"]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomSelect
            id="project-category"
            name="projectCategory"
            label="Project category"
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            options={["Product design", "Technology", "Art"]}
          />
          <CustomSelect
            id="project-subcategory"
            name="projectSubcategory"
            label="Project subcategory"
            value={projectSubcategory}
            onChange={(e) => setProjectSubcategory(e.target.value)}
            options={["design", "UI/UX", "Branding"]}
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project tags
        </label>
        <div className="flex flex-wrap gap-2 border border-[#8D75F7]  rounded-lg p-2 focus-within:ring-1 focus-within:ring-[#644FC1] focus-within:border-[#644FC1]">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Social media
        </label>

        <div className="flex flex-col gap-4">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full"
            >
              <SocialSelect
                link={link}
                index={index}
                availableTypes={availableSocialTypes}
                updateType={updateSocialLinkType}
              />
              <input
                type="url"
                defaultValue={link.url}
                placeholder={
                  link.type === "Instagram"
                    ? "http://instagram.com/wishwo"
                    : link.type === "Discord"
                    ? "http://Discord.com/wishwo"
                    : link.type === "Website"
                    ? "https://3f.com/"
                    : `http://example.com/${link.type.toLowerCase()}`
                }
                onChange={(e) => updateSocialLinkUrl(index, e.target.value)}
                className="mt-2 sm:mt-0 w-full sm:flex-1 border border-[#8D75F7]  rounded-lg p-2 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1]"
              />
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="mt-2 sm:mt-0 text-gray-400 hover:text-red-500 p-2 rounded-full transition flex-shrink-0"
              >
                <HiX size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="relative mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowSocialDropdown(!showSocialDropdown)}
            className="flex items-center text-gray-600 font-medium px-4 py-2 border border-gray-300 rounded-lg transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#644FC1]/50"
          >
            <HiPlus className="mr-2 w-5 h-5" /> Add social link
          </button>

          {showSocialDropdown && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
              {availableToAdd.map((type) => (
                <div
                  key={type}
                  onClick={() => addSocialLink(type)}
                  className="flex items-center p-3 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  <span className="mr-3">{socialMediaIcons[type]}</span>
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

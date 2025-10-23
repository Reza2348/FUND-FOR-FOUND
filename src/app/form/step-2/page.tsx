"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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

interface SocialSelectProps {
  link: SocialLink;
  index: number;
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
}

const SocialSelect: React.FC<SocialSelectProps> = ({
  link,
  index,
  socialLinks,
  setSocialLinks,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateType = (newType: string) => {
    setSocialLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, type: newType } : l))
    );
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-52 flex-shrink-0">
      <button
        type="button"
        className="flex items-center justify-between w-full border border-[#8D75F7] rounded-lg p-3 bg-white focus:ring-1 focus:ring-[#644FC1]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">
          <span className="mr-2">{socialMediaIcons[link.type]}</span>
          <span className="text-gray-700 font-medium">{link.type}</span>
        </span>
        <RiArrowDownSLine size={20} className="text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
          {Object.keys(socialMediaIcons).map((type) => (
            <div
              key={type}
              onClick={() => updateType(type)}
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

export default function StepTwoPage() {
  const [text, setText] = useState("");
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { type: "Instagram", url: "" },
    { type: "Discord", url: "" },
    { type: "Website", url: "" },
  ]);

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
      console.log("Form data:", { text, socialLinks });
      router.push("/form/step-3");
    },
    [text, socialLinks]
  );

  const updateSocialLinkUrl = (index: number, url: string) => {
    setSocialLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, url } : l))
    );
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const addSocialLink = (type: string) => {
    setSocialLinks((prev) => [...prev, { type, url: "" }]);
    setShowSocialDropdown(false);
  };

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
            Help your contributors find you faster (at leas 3 options)
          </label>
          <p className="text-[#505050] mb-5">
            Connect your socials so the contributors get to know you better and
            find you faster
          </p>

          <div className="flex flex-col gap-4">
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 w-full"
              >
                <SocialSelect
                  link={link}
                  index={index}
                  socialLinks={socialLinks}
                  setSocialLinks={setSocialLinks}
                />

                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLinkUrl(index, e.target.value)}
                  placeholder={`http://example.com/${link.type.toLowerCase()}`}
                  className="mt-2 sm:mt-0 lg:w-2xs sm:w-full sm:flex-1 border border-[#8D75F7] rounded-lg p-2 focus:ring-1 focus:ring-[#644FC1]"
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
              className="flex items-center text-gray-600 font-medium px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <HiPlus className="mr-2 w-5 h-5" /> Add social link
            </button>

            {showSocialDropdown && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
                {Object.keys(socialMediaIcons).map((type) => (
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

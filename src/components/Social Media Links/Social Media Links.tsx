import React, {
  useState,
  useCallback,
  ReactNode,
  useEffect,
  useRef,
} from "react";
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

// === اینترفیس‌های مشترک و ضروری ===
export interface SocialLink {
  // <-- مهم: Export شده برای استفاده در page.tsx
  type: string;
  url: string;
}

// === اینترفیس Props اصلی کامپوننت ===
export interface SocialMediaSectionProps {
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
}

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

interface SocialSelectProps {
  link: SocialLink;
  index: number;
  availableTypes: string[];
  usedTypes: string[]; // افزودن usedTypes برای فیلتر کردن
  updateType: (index: number, newType: string) => void;
  // chidl: ReactNode; // این Prop حذف شد چون در SocialSelect استفاده نشده بود
}

const SocialSelect: React.FC<SocialSelectProps> = ({
  link,
  index,
  availableTypes,
  usedTypes, // دریافت usedTypes
  updateType,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentIcon = socialMediaIcons[link.type] || (
    <FaGlobe className="text-gray-500" />
  );

  // فیلتر کردن انواع شبکه‌های اجتماعی که قبلاً استفاده شده‌اند
  const selectableTypes = availableTypes.filter(
    (type) => !usedTypes.includes(type) || type === link.type
  );

  // useEffect برای بستن دراپ‌داون هنگام کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-52 flex-shrink-0">
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
          {selectableTypes.map((type) => (
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

// === تعریف کامپوننت SocialMediaSection اصلاح شده ===
export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({
  socialLinks,
  setSocialLinks, // دریافت Propsهای مدیریتی
}) => {
  // ❌ State داخلی socialLinks حذف شد

  // ✅ فقط State مربوط به UI باقی می‌ماند
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableSocialTypes = Object.keys(socialMediaIcons);
  const usedSocialTypes = socialLinks.map((link) => link.type);
  const availableToAdd = availableSocialTypes.filter(
    (type) => !usedSocialTypes.includes(type)
  );

  // توابع به‌روزرسانی که از setSocialLinks آمده از Props استفاده می‌کنند
  const removeSocialLink = (index: number) => {
    setSocialLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const addSocialLink = (type: string) => {
    setSocialLinks((prevLinks) => [...prevLinks, { type, url: "" }]);
    setShowSocialDropdown(false);
  };

  const updateSocialLinkType = useCallback(
    (index: number, newType: string) => {
      setSocialLinks((prevLinks) =>
        prevLinks.map((link, i) =>
          i === index ? { ...link, type: newType } : link
        )
      );
    },
    [setSocialLinks]
  );

  const updateSocialLinkUrl = (index: number, newUrl: string) => {
    setSocialLinks((prevLinks) =>
      prevLinks.map((l, i) => (i === index ? { ...l, url: newUrl } : l))
    );
  };

  // useEffect برای بستن دراپ‌داون هنگام کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSocialDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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
              usedTypes={usedSocialTypes} // پاس دادن usedTypes
              updateType={updateSocialLinkType}
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateSocialLinkUrl(index, e.target.value)}
              placeholder={`Enter your ${link.type} link`}
              className="mt-2 sm:mt-0 w-full sm:flex-1 border border-[#8D75F7] rounded-lg p-2 focus:ring-1 focus:ring-[#644FC1] focus:border-[#644FC1]"
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

      <div ref={dropdownRef} className="relative mt-4 flex justify-center">
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
  );
};

"use client";

import Link from "next/link";
// ⬅️ ایمپورت کردن useRouter
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa"; // Icon for removing tags
import { BsChevronDown } from "react-icons/bs"; // Icon for dropdown indicator

// لیست تگ‌های پیشنهادی موجود برای انتخاب
const AVAILABLE_TAGS = [
  "Web design",
  "Software",
  "UI design",
  "UX design",
  "Branding",
  "Marketing",
  "Product design",
  "Photography",
  "E-commerce",
  "Fintech",
  "Health & Wellness",
];

export default function StepOnePage() {
  const router = useRouter(); // ⬅️ فراخوانی hook برای دسترسی به روتر

  const [brandName, setBrandName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["Product design"]); // Initial tags
  const [agreed, setAgreed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // وضعیت باز بودن Dropdown

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ⬅️ منطق فیلتر کردن لیست پیشنهادی
  const filteredSuggestions = AVAILABLE_TAGS.filter(
    (tag) =>
      // تگ‌هایی که قبلاً انتخاب نشده‌اند
      !tags.includes(tag) &&
      // شامل متن ورودی هستند یا Dropdown باز است (اگر متن خالی باشد، همه تگ‌ها را نشان بده)
      (tagInput.length === 0 ||
        tag.toLowerCase().includes(tagInput.toLowerCase()))
  ).slice(0, 8); // محدود کردن تعداد نمایش

  // تابع اضافه کردن تگ (هم برای Enter و هم برای کلیک روی پیشنهاد)
  const addTag = useCallback(
    (tagText: string) => {
      const newTag = tagText.trim();
      if (newTag && !tags.includes(newTag) && AVAILABLE_TAGS.includes(newTag)) {
        // فقط تگ‌های موجود در لیست ثابت را اضافه می‌کنیم
        setTags((prevTags) => [...prevTags, newTag]);
        setTagInput(""); // ورودی را پاک می‌کند
      } else if (
        newTag &&
        !tags.includes(newTag) &&
        !AVAILABLE_TAGS.includes(newTag)
      ) {
        // اگر اجازه نمی‌دهید:
        console.log("Custom tags are not allowed or tag already exists.");
        setTagInput("");
      }
    },
    [tags]
  );

  // هندلر کلیک روی یک تگ پیشنهادی
  const handleSuggestionClick = (tag: string) => {
    addTag(tag);
    setIsDropdownOpen(false); // Dropdown را ببند
    inputRef.current?.focus(); // فوکوس را به Input برگردان
  };

  // هندلر کلید برای Enter (برای راحتی تایپ و جستجو)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // اگر Enter زده شد
    if (e.key === "Enter") {
      e.preventDefault();
      // اگر فقط یک پیشنهاد وجود دارد، آن را انتخاب کن
      if (filteredSuggestions.length === 1) {
        handleSuggestionClick(filteredSuggestions[0]);
      } else {
        // در غیر این صورت، کاری نکن تا فقط از لیست انتخاب شود
      }
    }

    // اگر Escape زده شد، Dropdown بسته شود
    if (e.key === "Escape") {
      setIsDropdownOpen(false);
      inputRef.current?.blur();
    }
  };

  // Handler to remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    inputRef.current?.focus(); // فوکوس را حفظ کن
  };

  // بستن Dropdown با کلیک در خارج از کامپوننت
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  // ⬅️ تابع به‌روزرسانی شده ثبت فرم برای هدایت به step-2
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", {
      brandName,
      country,
      category,
      subCategory,
      tags,
      agreed,
    });

    // هدایت به صفحه /form/step-2
    router.push("/form/step-2");
  };

  // ⬅️ منطق باز و بسته شدن Dropdown
  const handleBoxClick = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {/* Headings */}
      <h2 className="text-xl font-semibold sm:text-2xl text-[#644FC1]">
        Basic info
      </h2>
      <p className="text-[#505050] text-xl sm:text-2xl font-bold">
        Tell about your Brand/organization
      </p>

      {/* Description */}
      <p className="text-gray-600 text-sm">
        Provide an overview of the brand or organization you want to register on
        3F.
      </p>

      {/* Grid for Brand Name & Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand/organisation name */}
        <div className="space-y-2">
          <label
            htmlFor="brandName"
            className="block text-sm font-medium text-gray-700"
          >
            Brand/organisation name <span className="text-[#C91433]">*</span>
          </label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150"
            required
          />
        </div>

        {/* Country (Dropdown) */}
        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country <span className="text-[#C91433]">*</span>
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150 appearance-none bg-white"
            required
          >
            <option value="" disabled>
              Select a country
            </option>
            <option value="united states">United States</option>
            <option value="canada">Canada</option>
            <option value="italy">Italy</option>
          </select>
        </div>
      </div>

      {/* Category Selection Description */}
      <p className="text-gray-600 text-sm">
        Select the primary category that best describes your brand or
        organization. Then select the subcategory that <br /> further defines
        your brand or organization.
      </p>

      {/* Category and Subcategory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category (Dropdown) */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category <span className="text-[#C91433]">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150 appearance-none bg-white"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="software">Software</option>
            <option value="web UI">Web UI</option>
          </select>
        </div>

        {/* Subcategory (Dropdown) */}
        <div className="space-y-2">
          <label
            htmlFor="subCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Subcategory <span className="text-[#C91433]">*</span>
          </label>
          <select
            id="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150 appearance-none bg-white"
            required
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            <option value="ui">UI Design</option>
            <option value="ux">UX Design</option>
          </select>
        </div>
      </div>

      {/* ⬅️ Brand Tags (Multi-select Input) */}
      <div className="space-y-2" ref={containerRef}>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Brand tags
        </label>

        <div className="relative">
          {/* Input Box and Tags Display */}
          <div
            className="flex items-center justify-between border border-gray-300 rounded-lg shadow-sm p-3 focus-within:ring-[#644FC1] focus-within:border-[#644FC1] transition duration-150 cursor-text"
            onClick={handleBoxClick} // کلیک روی باکس برای باز/بسته کردن Dropdown
          >
            <div className="flex flex-wrap gap-2 flex-1">
              {/* Display existing tags */}
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-[#644FC1] text-white text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // جلوگیری از بسته شدن Dropdown
                      removeTag(tag);
                    }}
                    className="ml-2 hover:text-red-300 transition"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Tag Input Field (برای جستجو) */}
              <input
                ref={inputRef}
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setIsDropdownOpen(true); // هنگام تایپ، Dropdown را باز کن
                }}
                onFocus={() => setIsDropdownOpen(true)} // هنگام فوکوس، Dropdown را باز کن
                onKeyDown={handleKeyDown}
                className="bg-transparent focus:outline-none placeholder-gray-400 flex-1 min-w-[100px] py-1"
                placeholder={
                  tags.length === 0 ? "Select or search for tags" : ""
                }
              />
            </div>

            {/* Icon Dropdown Indicator */}
            <BsChevronDown
              className={`w-4 h-4 text-gray-400 ml-3 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* ⬅️ لیست پیشنهادی که شبیه Dropdown باز می‌شود */}
          {isDropdownOpen && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredSuggestions.map((tag) => (
                <div
                  key={tag}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800 flex justify-between items-center"
                  onClick={() => handleSuggestionClick(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
          {/* پیام عدم وجود تگ در هنگام جستجو */}
          {isDropdownOpen &&
            tagInput.length > 0 &&
            filteredSuggestions.length === 0 && (
              <div className="absolute z-10 w-full mt-1 bg-gray-50 border border-gray-300 rounded-lg shadow-lg p-3 text-gray-500 text-sm">
                No matching tags found.
              </div>
            )}
        </div>
      </div>

      {/* Terms of Service Checkbox */}
      <div className="flex items-center pt-4">
        <input
          id="agree"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-4 w-4 text-[#644FC1] border-gray-300 rounded focus:ring-[#644FC1]"
          required
        />
        <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
          I agree with the{" "}
          <a href="#" className="text-[#644FC1] hover:underline">
            terms of service
          </a>{" "}
          of 3F.
        </label>
      </div>

      {/* Navigation Button */}
      <div className="flex justify-start pt-6">
        <button
          type="submit"
          className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 w-full md:w-auto"
          disabled={!agreed} // Disable if terms not agreed
        >
          Continue
        </button>
      </div>
    </form>
  );
}

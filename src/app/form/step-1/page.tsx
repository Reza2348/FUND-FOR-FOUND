"use client";

import { useRouter } from "next/navigation";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";

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
  const router = useRouter();

  const [formData, setFormData] = useState({
    brandName: "",
    country: "",
    category: "",
    subCategory: "",
    tags: ["Product design"],
    agreed: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));

      if (e.target.tagName === "SELECT") {
        switch (name) {
          case "country":
            setIsCountryOpen(false);
            break;
          case "category":
            setIsCategoryOpen(false);
            break;
          case "subCategory":
            setIsSubCategoryOpen(false);
            break;
          default:
            break;
        }
      }
    },
    []
  );

  const filteredSuggestions = AVAILABLE_TAGS.filter(
    (tag) =>
      !formData.tags.includes(tag) &&
      (tagInput.length === 0 ||
        tag.toLowerCase().includes(tagInput.toLowerCase()))
  ).slice(0, 8);

  const addTag = useCallback(
    (tagText: string) => {
      const newTag = tagText.trim();
      if (
        newTag &&
        !formData.tags.includes(newTag) &&
        AVAILABLE_TAGS.includes(newTag)
      ) {
        setFormData((prevData) => ({
          ...prevData,
          tags: [...prevData.tags, newTag],
        }));
        setTagInput("");
      } else if (newTag && !AVAILABLE_TAGS.includes(newTag)) {
        console.log("Custom tags are not allowed.");
        setTagInput("");
      }
    },
    [formData.tags]
  );

  const handleSuggestionClick = (tag: string) => {
    addTag(tag);
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (filteredSuggestions.length === 1) {
          handleSuggestionClick(filteredSuggestions[0]);
        }
      }

      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        inputRef.current?.blur();
      }
    },
    [filteredSuggestions, addTag]
  );

  const removeTag = useCallback(
    (tagToRemove: string) => {
      setFormData((prevData) => ({
        ...prevData,
        tags: prevData.tags.filter((tag) => tag !== tagToRemove),
      }));
      inputRef.current?.focus();
    },
    [inputRef]
  );

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

  const handleBoxClick = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form data:", formData);
      router.push("/form/step-2");
    },
    [formData, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-1 sm:space-y-8 lg:w-fit justify-start lg:justify-center lg:mx-auto"
    >
      <h2 className="text-xl font-semibold sm:text-2xl text-[#644FC1]">
        Basic info
      </h2>
      <p className="inline text-[#505050] lg:text-xl sm:text-2xl font-bold mt-3 mb-3">
        Tell about your Brand/organization
      </p>

      <p className="text-gray-600 text-sm">
        Provide an overview of the brand or organization you want to register on
        3F.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="brandName"
            value={formData.brandName}
            onChange={handleFormChange}
            className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country <span className="text-[#C91433]">*</span>
          </label>

          <div
            className="relative"
            onFocus={() => setIsCountryOpen(true)}
            onBlur={() => setIsCountryOpen(false)}
          >
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleFormChange} // handleFormChange اکنون Select را می‌بندد
              className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150 appearance-none bg-white pr-10"
              required
            >
              <option value="" disabled></option>
              <option value="united states">United States</option>
              <option value="canada">Canada</option>
              <option value="italy">Italy</option>
            </select>
            <BsChevronDown
              className={`
                absolute 
                top-1/2 
                right-3 
                -translate-y-1/2
                w-4 h-4 
                text-gray-400 
                pointer-events-none 
                transition-transform duration-200 
                ${isCountryOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </div>
        </div>
      </div>

      <p className="text-[#959595] text-sm mt-3 mb-3">
        Select the primary category that best describes your brand or
        organization. Then select the subcategory that <br /> further defines
        your brand or organization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category <span className="text-[#C91433]">*</span>
          </label>
          <div
            className="relative"
            onFocus={() => setIsCategoryOpen(true)}
            onBlur={() => setIsCategoryOpen(false)}
          >
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150 appearance-none bg-white pr-10"
              required
            >
              <option value="" disabled></option>
              <option value="software">Software</option>
              <option value="web UI">Web UI</option>
            </select>
            <BsChevronDown
              className={`
                absolute 
                top-1/2 
                right-3 
                -translate-y-1/2
                w-4 h-4 
                text-gray-400 
                pointer-events-none 
                transition-transform duration-200 
                ${isCategoryOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Subcategory <span className="text-[#C91433]">*</span>
          </label>
          <div
            className="relative"
            onFocus={() => setIsSubCategoryOpen(true)}
            onBlur={() => setIsSubCategoryOpen(false)}
          >
            <select
              id="subCategory"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-[#644FC1] focus:border-[#644FC1] transition duration-150 appearance-none bg-white pr-10"
              required
            >
              <option value="" disabled></option>
              <option value="ui">UI Design</option>
              <option value="ux">UX Design</option>
            </select>
            <BsChevronDown
              className={`
                absolute 
                top-1/2 
                right-3 
                -translate-y-1/2
                w-4 h-4 
                text-gray-400 
                pointer-events-none 
                transition-transform duration-200 
                ${isSubCategoryOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2" ref={containerRef}>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Brand tags
        </label>

        <div className="relative">
          <div
            className="flex items-center justify-between border border-gray-300 rounded-lg shadow-sm p-3 focus-within:ring-[#644FC1] focus-within:border-[#644FC1] transition duration-150 cursor-text"
            onClick={handleBoxClick} // اکنون فقط فوکوس را منتقل می‌کند
          >
            <div className="flex flex-wrap gap-2 flex-1">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-[#644FC1] text-white text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag);
                    }}
                    className="ml-2 hover:text-red-300 transition"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <input
                ref={inputRef}
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={handleKeyDown}
                className="bg-transparent focus:outline-none placeholder-gray-400 flex-1 min-w-[100px] py-1"
                placeholder={
                  formData.tags.length === 0 ? "Select or search for tags" : ""
                }
              />
            </div>

            <BsChevronDown
              className={`w-4 h-4 text-gray-400 ml-3 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

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

          {isDropdownOpen &&
            tagInput.length > 0 &&
            filteredSuggestions.length === 0 && (
              <div className="absolute z-10 w-full mt-1 bg-gray-50 border border-gray-300 rounded-lg shadow-lg p-3 text-gray-500 text-sm">
                No matching tags found.
              </div>
            )}
        </div>
      </div>

      <div className="flex items-center pt-4">
        <input
          id="agree"
          name="agreed"
          type="checkbox"
          checked={formData.agreed}
          onChange={handleFormChange}
          className="h-4 w-4 text-[#644FC1] border-gray-300 rounded focus:ring-[#644FC1]"
          required
        />
        <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
          I agree with the
          <a href="#" className="text-[#644FC1] hover:underline">
            terms of service
          </a>
          of 3F.
        </label>
      </div>

      <div className="flex justify-start pt-6">
        <button
          type="submit"
          className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-50 w-full md:w-auto"
          disabled={!formData.agreed}
        >
          Continue
        </button>
      </div>
    </form>
  );
}

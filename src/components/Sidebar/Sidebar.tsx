"use client";
import React, { useCallback, ElementType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { HiArrowRight } from "react-icons/hi";
import { FaGear } from "react-icons/fa6";
import ProfileCard from "../ProfileCard/ProfileCard";

// 🎨 رنگ‌ها و ثابت‌ها
const PURPLE_MAIN = "#644FC1";
const PURPLE_LIGHT = "#F3F0FF";
const PURPLE_BUTTON_BORDER = "#5746AF";
const PURPLE_BUTTON_BG = "#EDE9FE";

// 🟢 تعریف رابط Props که از والد (Layout) می‌آید
interface SidebarProps {
  sidebarOpen: boolean;
  // نوع صحیح برای تابع set state
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Section {
  id: string;
  label: string;
  hasArrow?: boolean;
  labelMobile?: string;
  iconMobile?: ElementType;
}

const sections: Section[] = [
  {
    id: "public-profile",
    label: "Public profile",
    labelMobile: "Setting",
    iconMobile: FaGear,
    hasArrow: true,
  },
  { id: "info", label: "Info" },
  { id: "contribution-tiers", label: "Contribution tiers" },
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "updates", label: "Updates" },
  { id: "expenses", label: "Expenses" },
  { id: "pay-out", label: "Pay out" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const activeSection = pathname.split("/").pop() || sections[0].id;

  const renderLink = useCallback(
    (sec: Section) => {
      const isActive: boolean = sec.id === activeSection;

      let className: string = `
          flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer transition-colors duration-150
          text-gray-700 hover:text-[${PURPLE_MAIN}]
        `;

      if (isActive) {
        className = `
            flex justify-between items-center py-2 px-3 rounded-lg cursor-pointer
            bg-[${PURPLE_LIGHT}] text-[${PURPLE_MAIN}] font-medium
          `;
      }

      const IconComponent = sec.iconMobile;

      return (
        <Link
          key={sec.id}
          href={`/dashboard/${sec.id}`}
          onClick={() => {
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              setSidebarOpen(false);
            }
          }}
          className={className.replace(/\s+/g, " ").trim()}
        >
          <span
            className={`flex items-center gap-2 ${
              isActive ? `text-[${PURPLE_MAIN}]` : "text-gray-700"
            }`}
          >
            {IconComponent && (
              <span className="md:hidden">
                <FaGear size={16} className="text-[#644FC1]" />
              </span>
            )}

            {sec.labelMobile ? (
              <>
                <span className="hidden md:inline">{sec.label}</span>
                <span className="md:hidden">{sec.labelMobile}</span>
              </>
            ) : (
              <span>{sec.label}</span>
            )}
          </span>

          {sec.hasArrow && (
            <HiArrowRight
              className={`h-4 w-4 ${
                isActive ? `text-[${PURPLE_MAIN}]` : "text-gray-400"
              }`}
            />
          )}
        </Link>
      );
    },
    [activeSection, setSidebarOpen]
  );

  return (
    <>
      <div
        className={`
          md:hidden 
          flex items-center justify-between 
          p-4  
            pr-[56px]
             pl-0
          w-full
        `}
      >
        <div
          className={`
            flex items-center justify-center 
            border-l-8 border-[#5746AF] 
            rounded-md 
            mt-1 
            p-4 
            bg-[#EDE9FE] 
            shadow 
          `}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ color: PURPLE_MAIN }}
            className={`text-[${PURPLE_MAIN}] font-bold`}
            aria-label="Open sidebar"
          >
            <FaGear size={20} />
          </button>
        </div>

        <div className="flex-1 ml-2">
          <ProfileCard />
        </div>
      </div>

      <div
        className={`
            fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 space-y-1 transform transition-transform duration-300 z-50
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:relative 
            md:shadow-xl 
            md:mt-4 md:ml-4 
            md:w-64 md:h-fit
            md:rounded-xl 
            md:p-6 
            md:translate-x-0 
          `}
      >
        <div className="flex justify-between items-center mb-4 pt-2">
          <h1 className={`text-[${PURPLE_MAIN}] text-lg font-bold`}>
            FUND FOR FOUND
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500"
            aria-label="Close sidebar"
          >
            <IoMdClose size={24} className={`text-[${PURPLE_MAIN}]`} />
          </button>
        </div>
        <div className="border-b border-gray-200 mb-[68px] md:hidden"></div>
        <div className="space-y-1 border-l border-[#D7CFF9] pl-4 md:border-l-0 md:pl-0">
          {sections.map(renderLink)}
        </div>
      </div>
    </>
  );
}

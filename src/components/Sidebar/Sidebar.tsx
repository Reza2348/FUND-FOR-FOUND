"use client";
import Link from "next/link";
import { useState, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";

interface Section {
  id: string;
  label: string;
  hasArrow?: boolean;
}

const sections: Section[] = [
  { id: "public-profile", label: "Public profile", hasArrow: true },
  { id: "info", label: "Info" },
  { id: "contribution-tiers", label: "Contribution tiers" },
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "updates", label: "Updates" },
  { id: "expenses", label: "Expenses" },
  { id: "pay-out", label: "Pay out" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("public-profile");

  const renderLink = useCallback(
    (sec: Section) => {
      const isActive = sec.id === activeSection;

      let className =
        "flex justify-between items-center text-gray-700 hover:text-[#644FC1] py-2 px-3 rounded-lg cursor-pointer transition-colors duration-150";

      if (isActive) {
        className =
          "flex justify-between items-center bg-[#F3F0FF] text-[#644FC1] font-medium py-2 px-3 rounded-lg cursor-pointer";
      }

      return (
        <Link
          key={sec.id}
          href={`/dashboard/${sec.id}`}
          onClick={() => {
            setActiveSection(sec.id);
            setSidebarOpen(false);
          }}
          className={className}
        >
          <span className={isActive ? "text-[#644FC1]" : "text-gray-700"}>
            {sec.label}
          </span>

          {sec.hasArrow && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ${
                isActive ? "text-[#644FC1]" : "text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </Link>
      );
    },
    [activeSection]
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:hidden p-4  shadow  bg-[#EDE9FE]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-[#644FC1] font-bold"
        >
          <FaGear />
        </button>
      </div>

      <div
        className={`

          fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 space-y-1 transform transition-transform duration-300 z-50


          md:relative 
          md:mt-4 md:ml-4 md:mb-4 
          md:h-[calc(100vh-2rem)] 
          md:rounded-xl 
          
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-4 pt-2 border-b border-gray-400 pb-2 md:border-b-0">
          <h1 className="text-[#644FC1] text-lg font-bold">FUND FOR FOUND</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="space-y-1">{sections.map(renderLink)}</div>
      </div>
    </div>
  );
}

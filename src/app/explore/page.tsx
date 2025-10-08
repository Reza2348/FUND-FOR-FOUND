"use client";

import React, { useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import Image from "next/image";

const Explore: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="max-w-[1280px] mx-auto mt-6 flex flex-col gap-10 px-4 pr-4">
      {/* 🔍 Search Header */}
      <div className="w-full bg-[#2D14B1] text-white rounded-2xl flex flex-col items-center py-10 px-6 relative">
        <div className="relative w-full sm:w-96 md:w-[500px]">
          <HiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="border border-gray-200 rounded-full pl-10 pr-10 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#5b4bff] transition-all bg-white text-gray-900"
          />
          {searchText && (
            <HiX
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black"
              size={18}
              onClick={() => setSearchText("")}
            />
          )}
        </div>

        {searchText && (
          <p
            className="mt-3 cursor-pointer hover:underline"
            onClick={() => setSearchText("")}
          >
            Cancel
          </p>
        )}
      </div>
      <div className="w-full bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-6">
        <h1 className="text-[#644FC1] text-2xl font-semibold text-center">
          Categories & Subcategories
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Technology & Knowledge",
            "Creative art & media",
            "Business & Entrepreneurship",
            "Special & Personal",
          ].map((cat) => (
            <button
              key={cat}
              className="px-5 py-2 border border-[#644FC1] text-[#644FC1] rounded-full hover:bg-[#644FC1] hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
            <option>Sort by</option>
            <option>Newest</option>
            <option>Most funded</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700">
            <option>Country</option>
            <option>USA</option>
            <option>Germany</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden w-full max-w-[320px] h-[420px] mx-auto"
            >
              <div className="relative w-full h-48">
                <Image
                  src="/Clip path group.svg"
                  alt="Project"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                  <h2 className="text-white text-sm font-semibold flex items-center gap-2">
                    <div className="w-6 h-6 bg-white flex items-center justify-center rounded-full">
                      <Image
                        src="/Circle.svg"
                        alt="Icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    Being podcast
                  </h2>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2">
                <p> Being podcast</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  A Foundation for Being is dedicated to exploring what it means
                  to live a meaningful life.
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <Image
                    src="/Terminal.svg"
                    alt="Project"
                    width={24}
                    height={24}
                  />
                  Creative art & media
                </p>

                <div className="border-t border-gray-200 mt-2"></div>
                <div className="text-xs text-gray-500 mt-1">
                  <p>117 Financial Contributions</p>
                  <p>$11,950 Money raised</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center mb-10">
        <button className="px-6 py-2 border border-[#644FC1] text-[#644FC1] rounded-md hover:bg-[#644FC1] hover:text-white transition">
          View more
        </button>
      </div>
    </div>
  );
};

export default Explore;

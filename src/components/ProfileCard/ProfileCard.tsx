"use client";
import React from "react";
import { HiArrowRight } from "react-icons/hi"; // 💡 برای پیکان سمت راست

const PURPLE_MAIN = "#644FC1";

export default function ProfileCard() {
  return (
    <div className="flex items-center justify-between w-full p-2">
      <div className="flex items-center">
        <div
          className={`
            w-10 h-10 
            flex items-center justify-center 
            bg-[${PURPLE_MAIN}] 
            rounded-full 
            text-[#6E56CF] text-lg font-bold ml-2 mr-2 
          `}
        >
          W
        </div>

        <div className="flex flex-col min-w-0">
          <p className="text-base font-semibold text-gray-800 truncate">
            Wish work profile
          </p>
          <p className="text-sm text-gray-500 truncate">shirani@wishwork.org</p>
        </div>
      </div>

      {/* 🟢 پیکان (سمت راست) */}
      <HiArrowRight className="h-5 w-5 text-gray-400" />
    </div>
  );
}

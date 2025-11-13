"use client";
import React, { useState } from "react";

const PRIMARY_PURPLE: string = "#644FC1";

const Page = () => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl mx-auto lg:ml-[73px]">
      <div className="my-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
          <span className={`text-[${PRIMARY_PURPLE}] sm:mr-2 hidden md:inline`}>
            ■
          </span>
          About
        </h2>
      </div>

      <p className="text-[#444444] mb-2.5 lg:ml-[10px]">
        Tell people why they should br exited for exited for backing your brand.
        tell about uour story, your plan and any thing <br />
        that may encourage them to contribute
      </p>
      <div>
        <textarea
          id="new-text"
          value={text}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg shadow-sm p-3 mt-2 focus:ring-[#644FC1] focus:border-[#644FC1]"
          rows={5}
          placeholder="Enter your text here"
        />
        <p className="mt-2 text-gray-500 text-sm text-start">
          Characters: <strong>{text.length}</strong>
        </p>
      </div>
    </div>
  );
};

export default Page;

import React from "react";

export default function AboutContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center mb-4 text-gray-800">
        <span className="w-3 h-3 bg-indigo-600 rounded-sm mr-2"></span>
        ABOUT
      </h3>
      <ul className="list-disc ml-6 space-y-3 text-gray-700">
        <li>
          Introduce yourself, your team (if you have) and your background.
        </li>
        <li>
          Briefly describe about the project long term and short term goal and
          why it's important to you.
        </li>
        <li>
          Introduce yourself, your team (if you have) and your background.
        </li>
        <li>
          Briefly describe about the project long term and short term goal and
          why it's important to you.
        </li>
      </ul>
    </div>
  );
}

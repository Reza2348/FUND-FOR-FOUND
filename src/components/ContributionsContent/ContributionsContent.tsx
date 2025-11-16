import React from "react";

export default function ContributionsContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold flex items-center mb-4 text-gray-800">
        <span className="w-3 h-3 bg-indigo-600 rounded-sm mr-2"></span>
        Contributions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-2xs bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-28 bg-black flex justify-center items-center">
            <h4 className="text-white text-3xl font-bold">Wish Work</h4>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-lg font-semibold text-gray-800">
                wish work
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                based in Canada
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              A Foundation for Easy to Develop & Deploy Web Apps.
            </p>
            <div className="border-t pt-3 flex flex-col text-sm">
              <p className="text-gray-700">117 Financial Contributors</p>
              <p className="font-medium text-gray-800 mt-2">
                $11,990 Money raised
              </p>
            </div>
          </div>
        </div>
        <div className="w-2xs bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-28 bg-[#00695C] flex justify-center items-center">
            <h4 className="text-white text-3xl font-bold">کلاسور</h4>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-lg font-semibold text-gray-800">
                Kelaasor
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                based in Iran
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              A Foundation for Easy to Develop & Deploy Web Apps.
            </p>
            <div className="border-t pt-3 flex flex-col text-sm">
              <p className="text-gray-700">117 Financial Contributors</p>
              <p className="font-medium text-gray-800 mt-2">
                $11,990 Money raised
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

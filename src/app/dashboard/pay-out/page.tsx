import React from "react";
const PRIMARY_PURPLE = "#644FC1";

const payout = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full lg:ml-[73px] lg:pt-0">
      <div className="my-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
          <span
            style={{ color: PRIMARY_PURPLE }}
            className="sm:mr-2 hidden md:inline"
          >
            ■
          </span>
          Pay out
        </h2>
      </div>
      <p className="text-[#2D2D2D] mb-8 lg:ml-[10px] text-base leading-relaxed">
        Your Wallet
        <span className="ml-[11px] text-[#2D2D2D]">balance:2000USDT</span>
      </p>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <button className="w-full lg:w-auto border py-2 px-10 bg-[#644FC1] text-white rounded-md">
          Connect to your wallet
        </button>
        <button className="w-full lg:w-auto border py-2 px-11 bg-[#644FC1] text-white rounded-md">
          Connect to your bank
        </button>
      </div>
    </div>
  );
};

export default payout;

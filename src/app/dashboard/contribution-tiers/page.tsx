import React from "react";

const Page = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl mx-auto lg:mt-[12px] lg:ml-[136px]">
      <div className="my-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
          <span className="text-[#644FC1] sm:mr-2 hidden md:inline">■</span>
          Contribution Tier
        </h2>
      </div>
      <p className="text-[#444444] mb-2.5">
        Most creator offer 3-6 reward tier which can be physical item or special
        experiences. make sure to set <br /> reasonable contibutor expectation
      </p>
      <p className="text-[#444444]">
        Remember each contributor can choose a recurring or One time payment
      </p>
      <div></div>
    </div>
  );
};

export default Page;

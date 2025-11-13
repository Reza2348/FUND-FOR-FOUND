"use client";
import React, { useState, FC } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "@/components/Modal/Modal";

const Page: FC = () => {
  const PRIMARY_PURPLE: string = "#644FC1";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl mx-auto lg:ml-[73px]">
      <div className="my-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
          <span className={`text-[${PRIMARY_PURPLE}] sm:mr-2 hidden md:inline`}>
            ■
          </span>
          Contribution Tier
        </h2>
      </div>
      <p className="text-[#444444] mb-2.5 lg:ml-[10px]">
        Most creators offer 3-6 reward tiers, which can be physical items or
        special experiences. Make sure to set reasonable contributor
        expectations.
      </p>
      <p className="text-[#444444] lg:ml-[10px] mb-8">
        Remember each contributor can choose a recurring or one-time payment.
      </p>

      <div className="lg:ml-[10px] lg:w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className={`bg-[${PRIMARY_PURPLE}] p-4`}>
              <h3 className="text-xl font-semibold text-white text-center">
                Donation
              </h3>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800 text-center mb-6">
                Make a custom one-time <br /> or recurring contribution.
              </p>
              <div className="w-full h-40 bg-[#f7f3ff] rounded-lg mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-[#e6e0f4]">
                  Donation
                </span>
              </div>
              <p className="text-sm text-gray-500 text-center mb-[32px]">
                You can make a donation at any amount that feels right to you.
                Every contribution helps and is greatly appreciated!
              </p>
              <button
                className={`w-full py-3 bg-[${PRIMARY_PURPLE}] text-white font-semibold rounded-lg hover:bg-[#523FA0] transition duration-150`}
              >
                This tier cannot be edited
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className={`bg-[${PRIMARY_PURPLE}] p-4`}>
              <h3 className="text-xl font-semibold text-white text-center">
                Supporter
              </h3>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800 text-center mb-8">
                Back the project without <br /> the reward
              </p>
              <div className="w-full h-40 bg-[#f7f3ff] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-[#e6e0f4]">
                  Supporter
                </span>
              </div>
              <p className="text-base font-bold text-gray-800 mb-6 sm:mr-0 whitespace-nowrap">
                Start at <span className={`text-[${PRIMARY_PURPLE}]`}>5$</span>
              </p>
              <p className="text-sm text-gray-500 text-center mb-8">
                Back it because you believe in it. Support the project for no
                reward, just because it speaks to you.
              </p>
              <button
                className={`w-full py-3 bg-[${PRIMARY_PURPLE}] text-white font-semibold rounded-lg hover:bg-[#523FA0] transition duration-150`}
              >
                Edit Tier
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className={`bg-[${PRIMARY_PURPLE}] p-4`}>
              <h3 className="text-xl font-semibold text-white text-center">
                Silver Sponsor
              </h3>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800 text-center mb-8">
                You are on the list
              </p>
              <div className="w-full h-40 bg-[#f7f3ff] rounded-lg mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-[#e6e0f4]">
                  Silver Sponsor
                </span>
              </div>
              <p className="text-base font-bold text-gray-800 mb-6 sm:mr-0 whitespace-nowrap">
                Start at <span className={`text-[${PRIMARY_PURPLE}]`}>40$</span>
              </p>
              <p className="text-sm text-gray-500 text-center mb-8">
                Join the guest list and be the first to <br />
                know major updates about our <br />
                project events. Plus, enjoy some digital gift card to be invited
                to the events
              </p>
              <button
                className={`w-full py-3 bg-[${PRIMARY_PURPLE}] text-white font-semibold rounded-lg hover:bg-[#523FA0] transition duration-150`}
              >
                Edit Tier
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className={`bg-[${PRIMARY_PURPLE}] p-4`}>
              <h3 className="text-xl font-semibold text-white text-center"></h3>
            </div>
            <div className="p-6 flex flex-col items-center">
              <p className="text-2xl font-semibold text-gray-800 text-center mb-8">
                Add Tier
              </p>
              <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                <button
                  className="w-20 h-20 bg-purple-600 text-white rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-105"
                  onClick={openModal}
                >
                  <IoAdd size={45} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-2xl font-bold mb-4">👋 افزودن سطح جدید</h2>
            <button
              onClick={closeModal}
              className={`mt-4 py-2 px-4 bg-[${PRIMARY_PURPLE}] text-white rounded`}
            >
              بستن
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Page;

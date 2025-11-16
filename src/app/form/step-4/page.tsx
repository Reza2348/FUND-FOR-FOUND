"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function StepThreePage() {
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setTimeout(() => {
        router.push("/dashboard/public-profile");
      }, 3000);
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1 sm:space-y-8 lg:w-fit justify-center lg:mx-auto">
        <h2 className="text-xl text-center font-semibold sm:text-2xl text-[#644FC1]">
          Congratulations!{" "}
          {/* Corrected typo: Conratulation -> Congratulations */}
        </h2>
        <div className="flex justify-center">
          <Image
            src="/cart2.svg"
            alt="logo"
            width={500}
            height={500}
            priority
          />
        </div>

        <div className="mb-6 text-center">
          <label className="block text-xl font-medium text-[#505050] mb-1">
            Your creative Starter has approved by our experts!
          </label>
          <p className="text-[#505050] mb-5">
            Welcome aboard! Let&apos;s dive in and get started{" "}
            {/* Fixed error: ' -> &apos; */}
          </p>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out w-full md:w-auto cursor-pointer"
          >
            Go to my profile
          </button>
        </div>
      </div>
    </form>
  );
}

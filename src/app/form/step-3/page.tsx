"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function StepTwoPage() {
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      router.push("/form/step-4");
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-1 sm:space-y-8 lg:w-fit justify-center lg:mx-auto">
        <h2 className="text-xl text-center font-semibold sm:text-2xl text-[#644FC1]">
          Detailed info
        </h2>

        <Image
          src="/cardt.png.svg"
          alt="logo"
          width={500}
          height={500}
          priority
        />

        <div className="mb-6 text-center">
          <label className="block text-xl font-medium text-[#505050] mb-1">
            You will be notified as soon as it is approved
          </label>
          <p className="text-[#505050] mb-5">
            Your information is under review and will be confirmed within 2 to 5
            <br />
            business days.
          </p>
        </div>

        <div className="flex justify-start pt-6">
          <button
            type="submit"
            className="bg-[#644FC1] hover:bg-[#523FA0] text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out w-full md:w-auto"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}

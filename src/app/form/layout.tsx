"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ProgressBar from "@/components/ProgressBar/ProgressBar";

function getCurrentStep(pathname: string): number {
  const match = pathname.match(/step-(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = getCurrentStep(pathname);

  return (
    <div className="container mx-auto p-4">
      <h1>
        <ProgressBar currentStep={currentStep} totalSteps={4} />
      </h1>

      <div>{children}</div>
    </div>
  );
}

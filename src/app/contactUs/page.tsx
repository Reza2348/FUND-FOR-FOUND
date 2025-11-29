"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contactSchema = z.object({
    name: z.string().min(1, t("Name is required")),
    email: z.string().email(t("Invalid email address")),
    message: z.string().min(1, t("Message is required")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a526f686-a039-477b-9c1a-71f470a7ba94",
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success(t("Message sent successfully!"));
        reset();
      } else {
        toast.error(t("Failed to send message."));
      }
    } catch (error) {
      toast.error(t("An error occurred. Please try again."));
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 space-y-6 border"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          {t("Contact Us")}
        </h2>

        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="font-medium text-gray-700">
            {t("Name")}
          </label>
          <input
            type="text"
            {...register("name")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("Enter your name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-700">
            {t("Email")}
          </label>
          <input
            type="email"
            {...register("email")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("Enter your email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="message" className="font-medium text-gray-700">
            {t("Message")}
          </label>
          <textarea
            rows={3}
            {...register("message")}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("Write your message...")}
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t("Sending...") : t("Submit")}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

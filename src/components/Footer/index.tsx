"use client";

import React from "react";
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { usePathname } from "next/navigation";
import { MdOutlineTranslate } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

interface FooterLink {
  name: string;
  href: string;
  badge?: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_NAV: FooterSection[] = [
  {
    title: "ABOUT",
    links: [
      { name: "AboutUs", href: "/about" },
      { name: "Contact Us", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { name: "Blog", href: "#" },
      { name: "How 3F works?", href: "#" },
      { name: "Help & Support", href: "#" },
    ],
  },
  {
    title: "CONTRIBUTING",
    links: [
      { name: "Brand & Organizations", href: "#" },
      { name: "Pricing", href: "#", external: true },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/auth")) return null;

  return (
    <footer className="bg-[#F5F5F5] text-[#444444] rounded-2xl mt-[412px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {FOOTER_NAV.map((section) => (
            <div key={section.title} className="text-center sm:text-left">
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center text-sm hover:text-gray-800"
                    >
                      {link.name}
                      {link.badge && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#AA99EC]">
        <div className="max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <button
              className="
    text-sm text-[#123D6F] border border-black rounded-md px-2 py-1
    flex items-center space-x-1 rtl:space-x-reverse 
  "
            >
              <MdOutlineTranslate />
              <span>English</span>
              <samp>(100)</samp>
              <BsChevronDown />
            </button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <p className="text-sm text-gray-500">Trust & Safety</p>
            <p className="text-sm text-gray-500">Terms of Use</p>
            <p className="text-sm text-gray-500">Privacy Policy</p>
          </div>
          <div className="flex gap-4 justify-center mt-2 sm:mt-0">
            <FaTwitter size={26} />
            <FaGithub size={26} />
            <FaDiscord size={26} />
            <FaLinkedin size={26} />
            <MdEmail size={26} />
          </div>
        </div>
      </div>
    </footer>
  );
}

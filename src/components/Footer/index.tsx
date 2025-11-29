"use client";

import React, { useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Link from "next/link";

import { useTranslation } from "react-i18next";

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

interface LinkComponentProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const FOOTER_NAV_KEYS = [
  {
    titleKey: "aboutUs",
    links: [
      { nameKey: "aboutUs", href: "/about" },
      { nameKey: "contactUs", href: "/contactUs" },
    ],
  },
  {
    titleKey: "explore",
    links: [
      { nameKey: "blog", href: "/blog" },
      { nameKey: "how3FWorks", href: "/how-it-works" },
      { nameKey: "help", href: "/help" },
    ],
  },
  {
    titleKey: "brandsAndOrganizations",
    links: [
      { nameKey: "brandsAndOrganizations", href: "/brands" },
      {
        nameKey: "pricing",
        href: "https://example.com/pricing",
        external: true,
      },
    ],
  },
];

const UTILITY_LINKS = [
  { nameKey: "trustAndSafety", href: "/safety" },
  { nameKey: "termsOfUse", href: "/terms" },
  { nameKey: "privacyPolicy", href: "/privacy" },
];

const LinkComponent = ({ href, external, children }: LinkComponentProps) => {
  const isExternal = external || href.startsWith("http");
  const commonProps = {
    className:
      "group inline-flex items-center text-sm hover:text-gray-800 transition-colors",
  };

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...commonProps}>
      {children}
    </Link>
  );
};

export default function Footer() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (pathname?.startsWith("/auth")) return null;

  if (!hasMounted) {
    return (
      <footer className={`bg-[#F5F5F5] text-[#444444] rounded-2xl`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"></div>
      </footer>
    );
  }

  const isRTL = i18n.language === "fa";
  const textAlignment = isRTL ? "sm:text-right" : "sm:text-left";
  const marginForBadge = isRTL ? "mr-2" : "ml-2";
  const containerDir = isRTL ? "rtl" : "ltr";

  const FOOTER_NAV: FooterSection[] = FOOTER_NAV_KEYS.map((section) => ({
    title: t(section.titleKey),
    links: section.links.map((link) => ({
      name: t(link.nameKey),
      href: link.href,
      external: link.external,
    })),
  }));

  return (
    <footer
      className={`bg-[#F5F5F5] text-[#444444] rounded-2xl mt-16 sm:mt-20 md:mt-24 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={containerDir}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {FOOTER_NAV.map((section) => (
            <div key={section.title} className={`text-center ${textAlignment}`}>
              <h3 className="text-sm font-semibold text-gray-900">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <LinkComponent href={link.href} external={link.external}>
                      {link.name}
                      {link.badge && (
                        <span
                          className={`${marginForBadge} inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </LinkComponent>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-[#AA99EC]">
        <div className="max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <LanguageSwitcher />
          <div className="flex flex-wrap justify-center items-center gap-4">
            {UTILITY_LINKS.map((link) => (
              <Link
                key={link.nameKey}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                {t(link.nameKey)}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 justify-center mt-2 sm:mt-0">
            <Link href={"https://twitter.com"} aria-label="Twitter">
              <FaTwitter
                size={26}
                className="text-gray-500 hover:text-blue-900 transition-colors"
              />
            </Link>
            <Link href={"https://github.com/Reza2348"} aria-label="GitHub">
              <FaGithub
                size={26}
                className="text-gray-500 hover:text-blue-900 transition-colors"
              />
            </Link>
            <Link href={"https://discord.gg"} aria-label="Discord">
              <FaDiscord
                size={26}
                className="text-gray-500 hover:text-blue-900 transition-colors"
              />
            </Link>
            <Link href={"https://linkedin.com"} aria-label="LinkedIn">
              <FaLinkedin
                size={26}
                className="text-gray-500 hover:text-blue-900 transition-colors"
              />
            </Link>
            <Link href={"mailto:info@example.com"} aria-label="Email">
              <MdEmail
                size={26}
                className="text-gray-500 hover:text-blue-900 transition-colors"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

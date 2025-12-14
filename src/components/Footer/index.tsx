"use client";

import React, { useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

interface FooterLink {
  nameKey: string;
  href: string;
  badge?: string;
  external?: boolean;
}

interface FooterSection {
  titleKey: string;
  links: FooterLink[];
}

interface LinkComponentProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const FOOTER_NAV_KEYS: FooterSection[] = [
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

const UTILITY_LINKS: FooterLink[] = [
  { nameKey: "trustAndSafety", href: "/safety" },
  { nameKey: "termsOfUse", href: "/terms" },
  { nameKey: "privacyPolicy", href: "/privacy" },
];

const LinkComponent = ({ href, external, children }: LinkComponentProps) => {
  const isExternal =
    external ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  const commonProps = {
    className:
      "group inline-flex items-center text-sm text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors",
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
      <footer className="text-gray-800 dark:text-gray-200 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"></div>
      </footer>
    );
  }

  const isRTL = i18n.language === "fa" || i18n.language === "ar";
  const textAlignment = isRTL ? "sm:text-right" : "sm:text-left";
  const marginForBadge = isRTL ? "mr-2" : "ml-2";
  const containerDir = isRTL ? "rtl" : "ltr";

  const FOOTER_NAV = FOOTER_NAV_KEYS.map((section) => ({
    title: t(section.titleKey),
    links: section.links.map((link) => ({
      name: t(link.nameKey),
      href: link.href,
      external: link.external,
      key: `${section.titleKey}-${link.nameKey}`,
      badge: link.badge,
    })),
  }));

  return (
    <footer
      className={`bg-[#F5F5F5] dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-2xl mt-16 sm:mt-20 md:mt-24 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={containerDir}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {FOOTER_NAV.map((section) => (
            <div
              key={section.title}
              className={`text-center sm:text-left ${textAlignment}`}
            >
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <LinkComponent href={link.href} external={link.external}>
                      {link.name}
                      {link.badge && (
                        <span
                          className={`${marginForBadge} inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs font-medium`}
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

      <div className="border-t border-[#AA99EC] dark:border-purple-700">
        <div className="max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <LanguageSwitcher />

          <div>
            <ThemeSelector />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {UTILITY_LINKS.map((link) => (
              <LinkComponent key={link.nameKey} href={link.href}>
                {t(link.nameKey)}
              </LinkComponent>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-2 sm:mt-0">
            {[
              {
                icon: FaTwitter,
                href: "https://twitter.com",
                label: "Twitter",
              },
              {
                icon: FaGithub,
                href: "https://github.com/Reza2348",
                label: "GitHub",
              },
              { icon: FaDiscord, href: "https://discord.gg", label: "Discord" },
              {
                icon: FaLinkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: MdEmail,
                href: "mailto:info@example.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon
                  size={26}
                  className="text-gray-500 dark:text-gray-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

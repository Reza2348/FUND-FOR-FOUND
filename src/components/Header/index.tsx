"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface User {
  username: string;
}

const Header: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/auth")) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "page/explore", label: "Explore" },
    { href: "/about", label: "AboutUs" },
    { href: "/help", label: "Help&Support" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const username = data.session.user.user_metadata?.username || "User";
        setUser({ username });
      } else {
        setUser(null);
      }
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const username = session.user.user_metadata?.username || "User";
          setUser({ username });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-4 lg:px-8 h-16 md:h-20">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/Vector.svg" alt="logo" width={25} height={20} />
          </Link>
        </div>

        <div className="hidden md:flex flex-grow justify-center gap-6 lg:gap-10 lg:ml-[106px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium transition-colors ${
                activeLink === link.href
                  ? "text-[#5b4bff]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 lg:gap-4 mt-2 md:mt-0">
          <div className="relative">
            <HiSearch
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search brand, category, tag or..."
              className="border border-gray-200 rounded-full pl-8 pr-3 py-1.5 text-sm w-32 sm:w-40 md:w-48 lg:w-64 focus:outline-none focus:ring-1 focus:ring-[#5b4bff] transition-all"
            />
          </div>

          {user ? (
            <div className="flex items-center justify-center px-4 py-1.5 bg-[#eae8fb] text-[#5b4bff] font-semibold rounded-full cursor-pointer">
              {user.username}
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-1.5 border border-[#5b4bff] text-[#5b4bff] rounded-full text-sm font-medium hover:bg-[#f2f0ff] transition inline-block text-center"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-1.5 border border-[#5b4bff] bg-[#5b4bff] text-white rounded-full text-sm font-medium hover:bg-[#493ae0] transition inline-block text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-5 space-y-4 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveLink(link.href);
                setIsMenuOpen(false);
              }}
              className={`block text-base font-medium ${
                activeLink === link.href
                  ? "text-[#5b4bff]"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="block px-4 py-2 bg-[#eae8fb] text-[#5b4bff] font-semibold rounded-full">
              {user.username}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-1.5 border border-[#5b4bff] text-[#5b4bff] rounded-full text-sm font-medium hover:bg-[#f2f0ff] transition inline-block text-center"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-1.5 border border-[#5b4bff] bg-[#5b4bff] text-white rounded-full text-sm font-medium hover:bg-[#493ae0] transition inline-block text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;

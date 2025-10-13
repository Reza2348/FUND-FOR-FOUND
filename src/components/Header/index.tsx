"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX, HiSearch, HiArrowRight } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { BiBriefcase } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

interface User {
  id: string;
  username: string;
  email: string;
}

interface NavLink {
  href: string;
  label: string;
}

// --- ✅ FIX: تعریف ثابت خارج از کامپوننت برای پایداری وابستگی ---
const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About us" },
  { href: "/help", label: "Help & Support" },
];
// -----------------------------------------------------------------

const MenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  isLogout?: boolean;
}> = ({ icon, label, onClick, href, isLogout = false }) => {
  const commonClasses =
    "flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition";
  const textClasses = isLogout
    ? "text-[#505050] hover:text-red-500"
    : "text-gray-700";

  if (href) {
    return (
      <Link
        href={href}
        className={`${commonClasses} ${textClasses}`}
        onClick={onClick}
      >
        <div className="w-6 flex items-center justify-center">{icon}</div>
        <span className="font-medium">{label}</span>
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={`${commonClasses} ${textClasses}`}>
      <div className="w-6 flex items-center justify-center">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // --- هوک‌ها ---
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  // ❌ حذف تعریف navLinks از اینجا

  // --- useEffect ها ---

  useEffect(() => {
    const currentPath = pathname || "/";
    let foundActiveLink = "";

    // ✅ استفاده از NAV_LINKS ثابت
    const sortedLinks = [...NAV_LINKS].sort(
      (a, b) => b.href.length - a.href.length
    );

    for (const link of sortedLinks) {
      if (
        currentPath.startsWith(link.href) &&
        (link.href !== "/" || currentPath === "/")
      ) {
        foundActiveLink = link.href;
        break;
      }
    }

    if (foundActiveLink) {
      setActiveLink(foundActiveLink);
    } else {
      setActiveLink("");
    }
    // ✅ حذف navLinks از آرایه وابستگی: اکنون فقط pathname باقی مانده است
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const username =
          (data.session.user.user_metadata?.username as string) || "User";
        const id = data.session.user.id;
        const email = data.session.user.email || "";
        setUser({ id, username, email });
      } else {
        setUser(null);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const username =
            (session.user.user_metadata?.username as string) || "User";
          const id = session.user.id;
          const email = session.user.email || "";
          setUser({ id, username, email });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }

      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".md\\:hidden > button")
      ) {
        setIsMenuOpen(false);
      }

      if (
        isSearchOpen &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".md\\:hidden .text-gray-700")
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isSearchOpen]);

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  // --- بازگشت شرطی در انتها ---
  if (pathname?.startsWith("/auth")) return null;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-4 lg:px-8 h-16 md:h-20">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/Vector.svg"
              alt="logo"
              width={25}
              height={20}
              priority
            />
          </Link>
        </div>

        {/* ✅ استفاده از NAV_LINKS */}
        <div className="hidden md:flex flex-grow justify-center gap-6 lg:gap-10 lg:ml-[106px]">
          {NAV_LINKS.map((link) => (
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
            <div className="relative" ref={userMenuRef}>
              <div
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-[#eae8fb] text-[#5b4bff] font-semibold rounded-full cursor-pointer select-none transition flex items-center justify-center text-base"
              >
                {user.username.substring(0, 2).toUpperCase()}
              </div>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl p-3 z-50">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center shrink-0">
                      <CgProfile size={24} className="text-purple-600" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
                        {user.username}
                      </span>
                      <span className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsUserMenuOpen(false)}
                      className="ml-auto text-gray-500 hover:text-gray-700 p-1 shrink-0"
                    >
                      <HiX size={20} />
                    </button>
                  </div>
                  <nav className="pt-3 flex flex-col gap-1">
                    <MenuItem
                      icon={<CgProfile size={20} className="text-gray-600" />}
                      label="My profile"
                      href={`/dashboard`}
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer transition">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-6 flex items-center justify-center">
                          <BiBriefcase size={20} className="text-gray-600" />
                        </div>
                        <span className="text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis block min-w-0">
                          My brands and organisations
                        </span>
                      </div>
                      <div className="text-gray-400 font-bold text-lg leading-none border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
                        +
                      </div>
                    </div>
                    <Link
                      href="#"
                      className="flex items-center gap-3 pl-12 py-1 text-sm text-purple-600 cursor-pointer hover:bg-purple-50 rounded-lg transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-100 font-bold text-xs">
                        W
                      </div>
                      <span className="font-medium">Wish work</span>
                    </Link>
                    <MenuItem
                      icon={
                        <IoSettingsOutline
                          size={20}
                          className="text-gray-600"
                        />
                      }
                      label="Setting"
                      href="/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <MenuItem
                      icon={<TbLogout size={20} className="text-gray-600" />}
                      label="Log out"
                      onClick={handleLogout}
                      isLogout={true}
                    />
                  </nav>
                </div>
              )}
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

        <div className="md:hidden flex items-center gap-3">
          <HiSearch
            size={24}
            className="text-gray-700 cursor-pointer"
            onClick={toggleSearch}
          />

          {user ? (
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 bg-[#eae8fb] text-[#5b4bff] font-semibold rounded-full cursor-pointer select-none transition flex items-center justify-center text-sm"
            >
              {user.username.substring(0, 2).toUpperCase()}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <CgProfile size={20} />
            </Link>
          )}

          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div
          ref={searchBarRef}
          className="md:hidden px-4 pb-3 pt-1 border-b border-gray-200 bg-white"
        >
          <div className="relative">
            <HiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search brand, category, tag or..."
              className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b4bff] transition-all"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
            >
              <HiX size={20} />
            </button>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 bg-white z-40 p-4"
        >
          <div className="flex justify-between items-center h-16 border-b border-gray-200 mb-6">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image src="/Vector.svg" alt="logo" width={25} height={20} />
            </Link>
            <div className="flex items-center gap-4">
              <HiSearch
                size={24}
                className="text-gray-700 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700"
              >
                <HiX size={26} />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-1 border-b border-gray-200 pb-8">
            {/* ✅ استفاده از NAV_LINKS */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
                className={`flex justify-between items-center text-lg font-medium py-3 px-2 rounded-lg transition ${
                  activeLink === link.href
                    ? "text-[#5b4bff] bg-[#f2f0ff]"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                {link.label}
                <HiArrowRight size={20} className="text-gray-400" />
              </Link>
            ))}
          </nav>

          {!user && (
            <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-3 bg-[#f2f0ff] text-[#5b4bff] rounded-xl text-base font-medium transition inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login/signup
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-3 bg-[#5b4bff] text-white rounded-xl text-base font-medium hover:bg-[#493ae0] transition inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Start
              </Link>
            </div>
          )}

          {user && (
            <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-3 bg-[#f2f0ff] text-[#5b4bff] rounded-xl text-base font-medium transition inline-block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-3 bg-red-50 text-red-600 rounded-xl text-base font-medium transition inline-block text-center hover:bg-red-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;

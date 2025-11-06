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

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About us" },
  { href: "/help", label: "Help & Support" },
];

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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentPath = pathname || "/";
    let foundActiveLink = "";
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

    setActiveLink(foundActiveLink);
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // ---- fetch user و listener با fallback امن ----
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const u = data.session.user;
        const username =
          u.user_metadata?.username || u.email?.split("@")[0] || "User";
        setUser({
          id: u.id,
          username,
          email: u.email || "",
        });
      } else {
        setUser(null);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const u = session.user;
          const username =
            u.user_metadata?.username || u.email?.split("@")[0] || "User";
          setUser({
            id: u.id,
            username,
            email: u.email || "",
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, isSearchOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsSearchOpen(false);
  };

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

      {/* Mobile search & menu ... باقی کد مشابه قبل */}
    </nav>
  );
};

export default Header;

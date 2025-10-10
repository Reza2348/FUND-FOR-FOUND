"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
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

// Utility component for menu items
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

  if (pathname?.startsWith("/auth")) return null;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "AboutUs" },
    { href: "/help", label: "Help&Support" },
  ];

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
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
    router.push("/");
  };

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
            <div className="relative" ref={userMenuRef}>
              <div
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-[#eae8fb] text-[#5b4bff] font-semibold rounded-full cursor-pointer select-none transition"
              >
                <span>{user.username}</span>
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
                      className="ml-auto text-[#644FC1] hover:text-[#644FC1] p-1 shrink-0"
                    >
                      <HiX size={20} />
                    </button>
                  </div>

                  <nav className="pt-3 flex flex-col gap-1">
                    <MenuItem
                      icon={<CgProfile size={20} className="text-gray-600" />}
                      label="My profile"
                      href={`/dashboard/dashboard/${user.id}`}
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

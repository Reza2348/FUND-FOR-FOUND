"use client";
import { useState } from "react";
import { FaDiscord, FaGlobe, FaInstagram, FaEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineFingerprint } from "react-icons/md";
import Contributiontiers from "../dashboard/contribution-tiers/page";
import AboutContent from "@/components/AboutContent/AboutContent";
import Team from "../dashboard/Team/page";
import FAQItem from "@/components/FAQ/Faq";
import UpdatesHeader from "@/app/dashboard/updates/page";
import BackersSection from "@/components/BackersSection/BackersSection";

const userName: string = "Wish Work";

type TabType =
  | "contribution_tier"
  | "about"
  | "team"
  | "backers"
  | "faq"
  | "updates";

interface TabItemProps {
  title: string;
  tabKey: TabType;
  currentTab: TabType;
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
}

const TabItem: React.FC<TabItemProps> = ({
  title,
  tabKey,
  currentTab,
  setTab,
}) => {
  const isActive = currentTab === tabKey;
  const activeClasses = "border-purple-600 text-purple-600 border-b-2 pb-3";
  const inactiveClasses =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 pb-3";

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setTab(tabKey);
      }}
      className={`whitespace-nowrap px-1 uppercase tracking-wider text-xs md:text-sm font-medium ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {title}
    </a>
  );
};

export default function ProfilePage() {
  const [tab, setTab] = useState<TabType>("contribution_tier");

  const renderTabContent = () => {
    switch (tab) {
      case "contribution_tier":
        return <Contributiontiers />;
      case "about":
        return <AboutContent />;
      case "team":
        return <Team />;
      case "backers":
        return <BackersSection />;
      case "faq":
        return <FAQItem />;
      case "updates":
        return <UpdatesHeader />;
    }
    return null;
  };

  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 bg-white">
          <div className="relative h-48 md:h-64 bg-gradient-to-br from-indigo-400/80 to-purple-600/80">
            <div className="absolute inset-0 flex items-start justify-start opacity-30 pointer-events-none">
              <MdOutlineFingerprint className="text-white h-48 w-48 mt-4 ml-4 md:h-72 md:w-72 md:mt-8 md:ml-8 transform rotate-12 scale-150" />
            </div>

            <h1 className="absolute top-1/2 -translate-y-1/2 left-5 text-3xl md:top-24 md:left-10 md:text-5xl font-semibold text-white/95 z-10">
              Brand or Organization
            </h1>

            <button className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/30 text-white text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-white/50 transition duration-300 flex items-center z-20">
              <FaEdit className="mr-2 h-3 w-3" /> Edit cover
            </button>

            <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 text-white/90 text-lg md:text-xl font-medium z-20">
              000$
              <span className="text-xs md:text-sm font-light">
                Total contribution
              </span>
            </div>
          </div>

          <div className="relative px-4 sm:px-6 md:px-10 pb-4">
            <div className="absolute -top-12 md:-top-16 left-4 sm:left-6 md:left-10">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-purple-700/80 rounded-xl flex items-center justify-center shadow-2xl">
                <button className="text-white text-xs md:text-sm px-3 py-1 rounded-md hover:bg-white/20 transition duration-300">
                  Edit profile
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-12 md:pt-16">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 ml-24 md:ml-0">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 -translate-y-1 md:translate-y-4">
                  {userName}
                </h2>

                <div className="flex space-x-3 -translate-y-1 md:translate-y-4 pt-1">
                  <FaDiscord className="text-gray-500 hover:text-blue-600 cursor-pointer h-5 w-5" />
                  <FaGlobe className="text-gray-500 hover:text-green-600 cursor-pointer h-5 w-5" />
                  <FaInstagram className="text-gray-500 hover:text-pink-600 cursor-pointer h-5 w-5" />

                  <button className="flex items-center text-purple-600 border border-purple-200 bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-lg text-xs md:text-sm font-medium hover:bg-purple-50 transition duration-300 shadow-sm">
                    <FaEdit className="mr-1 h-3 w-3" /> Edit
                  </button>
                </div>
              </div>

              <button className="bg-purple-600 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition duration-300 flex items-center shadow-md mt-4 md:mt-0">
                <IoSettingsOutline className="mr-2 h-4 w-4" /> Setting
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200 mt-6 mx-4 sm:mx-6 md:mx-10">
            <nav className="-mb-px flex space-x-4 md:space-x-8 text-sm font-medium overflow-x-auto pb-0.5">
              <TabItem
                title="CONTRIBUTION TIER"
                tabKey="contribution_tier"
                currentTab={tab}
                setTab={setTab}
              />
              <TabItem
                title="ABOUT"
                tabKey="about"
                currentTab={tab}
                setTab={setTab}
              />
              <TabItem
                title="TEAM"
                tabKey="team"
                currentTab={tab}
                setTab={setTab}
              />
              <TabItem
                title="TOP BACKERS & CONTRIBUTORS"
                tabKey="backers"
                currentTab={tab}
                setTab={setTab}
              />
              <TabItem
                title="FAQ"
                tabKey="faq"
                currentTab={tab}
                setTab={setTab}
              />
              <TabItem
                title="UPDATES"
                tabKey="updates"
                currentTab={tab}
                setTab={setTab}
              />
            </nav>
          </div>
          <div className="p-4 md:p-6 text-gray-700">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { FaDiscord, FaYoutube } from "react-icons/fa";
interface UpdateData {
  id: number;
  platform: "Discord" | "YouTube";
  username: string;
  date: string;
  content: string;
  icon: React.ReactNode;
}

type UpdateItemProps = Omit<UpdateData, "id">;

const updatesData: UpdateData[] = [
  {
    id: 1,
    platform: "Discord",
    username: "Amirhossein Shirani",
    date: "10 July 2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    icon: <FaDiscord className="text-indigo-500 w-5 h-5" />,
  },
  {
    id: 2,
    platform: "YouTube",
    username: "Amirhossein Shirani",
    date: "10 May 2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. .",
    icon: <FaYoutube className="text-red-500 w-5 h-5" />,
  },
  {
    id: 3,
    platform: "YouTube",
    username: "Amirhossein Shirani",
    date: "10 May 2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. .",
    icon: <FaYoutube className="text-red-500 w-5 h-5" />,
  },
];

const PRIMARY_PURPLE = "#644FC1";

const UpdatesHeader: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full lg:ml-[73px] lg:pt-0">
      <div className="my-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
          <span
            style={{ color: PRIMARY_PURPLE }}
            className="sm:mr-2 hidden md:inline"
          >
            ■
          </span>
          UPDATES
        </h2>
      </div>
      <p className="text-[#444444] mb-8 lg:ml-[10px] text-base leading-relaxed">
        The updated content will be synced to social platforms such as YouTube,
        Discord, Instagram, and more. <br />
        Whenever you share updates there, they will automatically appear here as
        well.
      </p>
    </div>
  );
};

const UpdateItem: React.FC<UpdateItemProps> = ({
  platform,
  username,
  date,
  content,
}) => {
  const getPlatformColors = (platform: UpdateItemProps["platform"]) => {
    switch (platform) {
      case "Discord":
        return {
          tagBg: "bg-indigo-50",
          tagText: "text-indigo-600",
        };
      case "YouTube":
        return {
          tagBg: "bg-red-50",
          tagText: "text-red-600",
        };
      default:
        return {
          tagBg: "bg-gray-100",
          tagText: "text-gray-600",
        };
    }
  };

  const getTagIcon = (platform: UpdateItemProps["platform"]) => {
    switch (platform) {
      case "Discord":
        return <FaDiscord className="w-3 h-3 ml-1 mr-1" />;
      case "YouTube":
        return <FaYoutube className="w-4 h-4 ml-1 mr-1" />;
      default:
        return null;
    }
  };

  const colors = getPlatformColors(platform);
  const tagIcon = getTagIcon(platform);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 relative">
      <span className="absolute top-6 right-6 text-xs text-indigo-400 whitespace-nowrap">
        {date}
      </span>

      <div className="flex items-start justify-between">
        <div className="flex items-start w-full">
          <div
            className={`w-10  h-10 rounded-lg bg-gray-200  mr-4 flex-shrink-0 flex items-center justify-center border-5 border-[#644FC1]`}
          ></div>
          <div className="flex flex-col flex-grow pr-20 sm:pr-24">
            <p className="text-gray-700 text-sm">
              <span className="font-bold text-gray-800 mr-1">{username}</span>
              published a new update on
              <span className="font-semibold text-gray-800 ml-2">
                {platform}
              </span>
            </p>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
        <div
          className={`absolute bottom-6 right-6 px-3 py-1 text-xs font-medium rounded-xl flex items-center ${colors.tagBg} ${colors.tagText}`}
        >
          {tagIcon}
          {platform}
        </div>
      </div>
    </div>
  );
};

export default function UpdatesPage() {
  return (
    <div className="flex flex-col items-center  min-h-screen">
      <div className="w-full max-w-4xl">
        <UpdatesHeader />
      </div>
      <div className="w-full max-w-2xl space-y-4 pb-12 px-4 sm:px-6">
        {updatesData.map((update) => (
          <UpdateItem key={update.id} {...update} />
        ))}
        <div className="flex justify-center pt-4">
          <button className="px-9 py-2 bg-[#F7F5FF] text-[#644FC1] border border-[#C7C6C6] rounded-md  text-sm font-medium">
            View all
          </button>
        </div>
      </div>
    </div>
  );
}

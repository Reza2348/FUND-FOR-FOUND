import React from "react";
import { MdPersonOutline, MdEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const PRIMARY_PURPLE = "#644FC1";

interface TeamMemberProps {
  name: string;
  role: "Admin" | "Teammate";
  description: string;
  createdBrands: number;
  contributedProjects: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  description,
  createdBrands,
  contributedProjects,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xs flex flex-col justify-between h-[439px]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-[#E7E7E7] border-4 border-[#D7CFF9] rounded-md flex items-center justify-center mr-3">
            <MdPersonOutline size={46} className="text-[#D7CFF9]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          </div>
        </div>
        <div className=" border border-[#F5F5F5]">
          <MdEdit size={25} className="text-[#717171]" />
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mb-3">
          {role}
        </span>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
          {description}
          <a href="#" className="text-blue-600 hover:underline">
            Read more
          </a>
        </p>
      </div>

      <div className="pt-4 border-t border-gray-200 text-sm text-gray-700 mt-auto">
        <div className="flex justify-between mb-2">
          <span>Created</span>
          <span>{createdBrands} brands</span>
        </div>
        <div className="flex justify-between">
          <span>Contributed</span>
          <span>{contributedProjects} projects</span>
        </div>
      </div>
    </div>
  );
};

const InviteCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xs flex flex-col items-center justify-center text-center h-[439px]">
      <h3 className="font-semibold text-lg text-gray-800 mb-6">
        Invite team member
      </h3>
      <button className="w-20 h-20 bg-purple-600 text-white rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-105">
        <IoAdd size={45} />
      </button>
    </div>
  );
};

const Team = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-5xl mx-auto lg:ml-[73px]">
      <div className="my-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-5">
          <span
            style={{ color: PRIMARY_PURPLE }}
            className="sm:mr-2 hidden md:inline"
          >
            ■
          </span>
          TEAM
        </h2>
      </div>
      <p className="text-[#444444] mb-2.5 lg:ml-[10px]">
        <span className="text-[#2D2D2D]">Admins</span> can edit settings,
        approve expenses, and receive activity notifications (such as when a new
        expense is <br /> submitted). They are the active managers of a
        Collective.
      </p>
      <p className="text-[#444444] mb-6 lg:ml-[10px]">
        <span className="text-[#100101]">Teammates</span> are shown as part of
        the team on your page but do not have admin access or get notifications.
        <br /> They have a profile page on the platform.
      </p>

      <div className="flex flex-wrap gap-6">
        <TeamMember
          name="Amirhossein Shirani"
          role="Admin"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          createdBrands={1}
          contributedProjects={0}
        />
        <TeamMember
          name="Amirhossein Shirani"
          role="Teammate"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          createdBrands={1}
          contributedProjects={0}
        />
        <InviteCard />
      </div>
    </div>
  );
};

export default Team;

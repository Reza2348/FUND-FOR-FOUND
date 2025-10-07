"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiSearch, HiX } from "react-icons/hi";

interface Brand {
  id: number;
  name: string;
}

// تابع fetch
const fetchBrands = async (query: string): Promise<Brand[]> => {
  if (!query) return [];
  const res = await fetch(`/api/brands?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch brands");
  return res.json();
};

const Explore: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");

  const {
    data: brands,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brands", searchText],
    queryFn: () => fetchBrands(searchText),
    enabled: !!searchText,
  });

  return (
    <div className="max-w-[1280px] mx-auto mt-6 flex flex-col gap-6">
      {/* Search Section */}
      <div className="w-full h-[167px] bg-[#2D14B1] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-center py-6 px-4 sm:px-6 relative">
        <div className="relative w-full sm:w-64 md:w-96">
          <HiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            placeholder="Search"
            className="border border-gray-200 rounded-full pl-10 pr-10 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#5b4bff] transition-all bg-white text-gray-950"
          />
          {searchText && (
            <HiX
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black"
              size={18}
              onClick={() => setSearchText("")}
            />
          )}
        </div>

        {searchText && (
          <p
            className="mt-3 sm:mt-0 sm:ml-4 cursor-pointer hover:underline"
            onClick={() => setSearchText("")}
          >
            Cancel
          </p>
        )}

        {searchText && (
          <div className="absolute top-full left-0 mt-4 w-full sm:w-auto bg-white text-gray-950 rounded-lg max-h-60 overflow-y-auto shadow-lg z-10">
            {isLoading && <p className="p-2">Loading...</p>}
            {isError && (
              <p className="p-2 text-red-500">Error fetching brands</p>
            )}
            {!isLoading && brands && brands.length === 0 && (
              <p className="p-2">No results found</p>
            )}
            {brands &&
              brands.map((brand) => (
                <div
                  key={brand.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {brand.name}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="w-full bg-white rounded-md shadow p-6 flex flex-col items-center gap-4">
        <h1 className="text-[#644FC1] text-2xl font-semibold text-center">
          Categories & Subcategories
        </h1>
        <button className="w-[149px] h-[39px] border border-[#644FC1] text-[#644FC1] rounded hover:bg-[#644FC1] hover:text-white transition">
          Creative art & media
        </button>
        <button className="w-[149px] h-[39px] border border-[#644FC1] text-[#644FC1] rounded hover:bg-[#644FC1] hover:text-white transition">
          Creative art & media
        </button>
        <button className="w-[149px] h-[39px] border border-[#644FC1] text-[#644FC1] rounded hover:bg-[#644FC1] hover:text-white transition">
          Creative art & media
        </button>
        <button className="w-[149px] h-[39px] border border-[#644FC1] text-[#644FC1] rounded hover:bg-[#644FC1] hover:text-white transition">
          Creative art & media
        </button>
      </div>
    </div>
  );
};

export default Explore;

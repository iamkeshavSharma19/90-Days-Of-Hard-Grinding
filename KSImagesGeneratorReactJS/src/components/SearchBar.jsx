import React, { useState } from "react";
import { useImageResult } from "../hooks/useImageResult";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);
  //useImageResult();
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="m-6 p-6 ">
        <input
          type="text"
          placeholder="Search Something here..."
          className="bg-white h-12 w-190 rounded-l-4xl text-2xl text-center text-black shadow-[0_0_5px_2px_#facc15] border border-yellow-400 rounded-md p-2 outline-none"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        />
        <button
          className="bg-[#231B0F] h-12 w-30 rounded-r-4xl text-2xl shadow-[0_0_5px_2px_#facc15] border border-amber-600-400 rounded-md p-2 outline-none"
          style={{ fontFamily: "Bungee Spice" }}
          onClick={() => {
            useImageResult(searchQuery);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

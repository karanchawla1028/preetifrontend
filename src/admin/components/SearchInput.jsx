import React from "react";
import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="relative w-64">
      {/* Search Icon */}
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search"
        className="
          w-full
          pl-10
          pr-3
          py-2
          border border-gray-300
          rounded-lg
          outline-none
          focus:border-blue-500
          focus:ring-0
          transition
        "
      />
    </div>
  );
};

export default SearchInput;
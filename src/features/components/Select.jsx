import React, { useState, useRef, useEffect } from "react";

const Select = ({
  options = [],
  labelKey = "label",
  valueKey = "value",
  value,
  onChange,
  placeholder = "Select...",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((item) =>
    item[labelKey].toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel =
    options.find((item) => item[valueKey] === value)?.[labelKey] || placeholder;

  return (
    <div className="relative w-full" ref={ref}>
      {/* Selected Box */}
      <div
        className="border rounded px-3 py-2 cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {selectedLabel}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full bg-white border rounded mt-1 z-50 max-h-48 overflow-auto shadow">
          
          {/* Search Input */}
          <input
            type="text"
            className="w-full border-b px-3 py-2 outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* List */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <div
                key={item[valueKey]}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(item[valueKey]);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {item[labelKey]}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;

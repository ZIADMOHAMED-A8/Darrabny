"use client"

import { useState, useRef } from "react"
import OutsideClickHandler from "react-outside-click-handler";
export default function SearchBar(){
  const [isempty,setIsEmpty] = useState(true);
  const [isloading,setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout|null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setIsLoading(true);
    setIsEmpty(value === "");

    debounceRef.current = setTimeout(() => {
      //to do later (fetch search results)

      setIsLoading(false);
    }, 500);
  }

  return(
    <div className="relative w-full">
  <OutsideClickHandler
        onOutsideClick={() => {
          setIsEmpty(true); 
        }}
      >
      <input
        type="text"
        placeholder="Search for companies..."
        className="w-full block rounded-md mt-4 mb-4 border border-gray-300 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-blue-500"
        onChange={handleChange}
      />

<div
  className={`absolute z-10 rounded-md w-full left-0 top-full bg-white border border-gray-200 shadow-lg transition-all duration-300
  ${(isempty || isloading) ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}
>
  <ul className="py-2">
    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">company1</li>
    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">company2</li>
    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">company3</li>
  </ul>
</div>
</OutsideClickHandler>
    </div>
  )
}

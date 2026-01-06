import React from "react";
import { twMerge } from "tailwind-merge";

const Textarea = ({ id, label, className, placeholder, rows, ...props }) => {
  const containerClass = twMerge("space-y-1.5 w-full", className);

  return (
    <div className={containerClass}>
      <label htmlFor={id} className="font-medium text-blue">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full bg-white px-4 py-3 text-[#131D3B] focus:border focus:border-blue focus:outline-none"
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default Textarea;

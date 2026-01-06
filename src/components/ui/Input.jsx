import React from "react";
import { twMerge } from "tailwind-merge";

const Input = ({
  id,
  label,
  type = "text",
  className,
  placeholder,
  ...props
}) => {
  const containerClass = twMerge("space-y-1.5 w-full", className);

  return (
    <div className={containerClass}>
      <label htmlFor={id} className="font-medium text-blue">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full bg-white px-4 py-3 text-[#131D3B] focus:border focus:border-blue focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;

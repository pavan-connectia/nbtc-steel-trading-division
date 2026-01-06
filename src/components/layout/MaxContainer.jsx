import React from "react";
import { twMerge } from "tailwind-merge";

const MaxContainer = ({ children, className }) => {
  const containerClassName = twMerge("max-w-[1280px] mx-auto", className);
  return <div className={containerClassName}>{children}</div>;
};

export default MaxContainer;

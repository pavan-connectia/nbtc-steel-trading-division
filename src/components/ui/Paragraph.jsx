import React from "react";
import { twMerge } from "tailwind-merge";

const Paragraph = ({ children, className }) => {
  const paraClass = twMerge("font-lato text-blue", className);
  return <p className={paraClass}>{children}</p>;
};

export default Paragraph;

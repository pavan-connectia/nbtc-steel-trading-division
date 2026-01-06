import React from "react";
import { twMerge } from "tailwind-merge";

const Card = ({ children, className, ...props }) => {
  const cardClass = twMerge("bg-white", className);
  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default Card;

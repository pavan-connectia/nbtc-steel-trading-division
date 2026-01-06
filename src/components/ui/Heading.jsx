import React from "react";
import { twMerge } from "tailwind-merge";

const Heading = ({ onClick, className, children, variant, Tag = "h2" }) => {
  const variantStyles = {
    big: "text-2xl font-semibold text-center font-kanit text-blue sm:text-3xl md:text-4xl lg:text-[2.5rem]",
    small:
      "text-sm font-medium text-center uppercase md:text-base text-red font-kanit",
  };

  const variantClassName = variantStyles[variant];

  const headingClass = twMerge(`font-kanit ${variantClassName}`, className);

  return (
    <Tag onClick={onClick} className={headingClass}>
      {children}
    </Tag>
  );
};

export default Heading;

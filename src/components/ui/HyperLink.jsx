import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const HyperLink = ({ href, children, icon, className, variant, ...props }) => {
  const variantStyles = {
    none: "text-red hover:border border-red",
    outline: "text-red border border-red",
    filled: "text-white bg-red",
  };

  const variantClassName = variantStyles[variant];
  const linkClassName = twMerge(
    `font-kanit px-3 rounded-[4px] py-2 flex items-center gap-x-2 w-fit  ${variantClassName}`,
    className,
  );
  return (
    <Link to={href} className={linkClassName} name={children} {...props}>
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </Link>
  );
};

export default HyperLink;

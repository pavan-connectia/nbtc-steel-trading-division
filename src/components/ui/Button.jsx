import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ onClick, className, text, icon, variant, ...props }) => {
  const variantStyles = {
    primary: "bg-blue text-white",
    primaryOutline:
      "border-blue border text-blue  bg-transparent hover:bg-blue hover:text-white",
    secondary: "bg-red text-white",
    secondaryOutline:
      "bg-transparent text-red border-red border hover:bg-red hover:text-white",
  };

  const variantClassName = variantStyles[variant];

  const buttonClass = twMerge(
    `px-3 py-2 text-sm rounded-sm flex items-center justify-center gap-3 font-kanit ${variantClassName}`,
    className,
  );

  return (
    <button onClick={onClick} className={buttonClass} {...props}>
      {text}
      {icon && icon}
    </button>
  );
};

export default Button;

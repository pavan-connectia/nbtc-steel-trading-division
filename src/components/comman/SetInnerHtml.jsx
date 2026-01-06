import DOMPurify from "dompurify";
import React from "react";
import { twMerge } from "tailwind-merge";

const SetInnerHtml = ({ text, className }) => {
  const santizedText = DOMPurify.sanitize(text);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: santizedText }}
      className={twMerge("font-lato text-blue", className)}
    ></div>
  );
};

export default SetInnerHtml;

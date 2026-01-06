import React from "react";
import { Heading, HyperLink, Paragraph } from "@/components";

const NotFound = () => {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <Heading
        variant="big"
        children="404"
        className="text-6xl sm:text-8xl md:text-9xl lg:text-[9rem]"
      />
      <Paragraph
        children="Page Not Found"
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
      />
      <HyperLink
        href={"/"}
        children="Go back"
        variant="outline"
        className="my-5"
      />
    </div>
  );
};

export default NotFound;

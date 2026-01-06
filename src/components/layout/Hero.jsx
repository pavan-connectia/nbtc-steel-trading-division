import React from "react";
import { Heading, Img, MaxContainer } from "..";
import { twMerge } from "tailwind-merge";

const Hero = ({
  src,
  imgClassName,
  heading,
  containerClass,
  children,
  dynamic = false,
}) => {
  const imgClass = twMerge("object-cover w-full h-full", imgClassName);
  const divClass = twMerge(
    "bg-blue h-[26rem] overflow-hidden relative",
    containerClass,
  );
  return (
    <div className={divClass}>
      <Img dynamic={dynamic} src={src} className={imgClass} />
      <div className="absolute inset-0 top-0 bg-gradient-to-r from-black to-transparent" />

      {heading && (
        <Heading
          variant="big"
          className={"absolute top-[50%] z-20 w-full uppercase text-white"}
          children={heading}
        />
      )}
      <MaxContainer>{children}</MaxContainer>
    </div>
  );
};

export default Hero;

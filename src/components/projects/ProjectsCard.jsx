import React from "react";
import { Heading, HyperLink, Img, Paragraph } from "..";
import { twMerge } from "tailwind-merge";
import { LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const ProjectsCard = ({ projects, containerClass }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const currentLang = isRTL ? "ar" : "en";

  const defaultClass = twMerge(
    "row-span-6 max-h-[20rem] min-h-[20rem] max-w-[25rem] relative overflow-hidden group",
    containerClass
  );

  return (
    <div className={defaultClass}>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0B1228] to-[#0B1228]/0 group-hover:bg-blue/80 transition-all duration-300 cursor-pointer" />

      <div className="absolute inset-0 z-20 p-5">
        <Heading
          className="line-clamp-3 font-normal text-[#F8F9FD] md:text-base lg:text-[1.25rem]"
        >
          {projects?.title?.[currentLang]}
        </Heading>

        <Paragraph className="mt-2 text-sm !text-[#F8F9FD]">
          {projects?.location?.[currentLang]}
        </Paragraph>

        <hr className="my-3 w-[18rem]" />

        <HyperLink
          variant="filled"
          className={`absolute bottom-5 ${
            isRTL ? "left-5" : "right-5"
          } opacity-0 group-hover:opacity-100 transition-all duration-300`}
          icon={<LuArrowRight className="rtl:rotate-180" />}
          href={`/projects/${projects?._id}`}
        >
          {t("home.view_more")}
        </HyperLink>
      </div>

      <Img
        dynamic
        src={projects?.image}
        className="z-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default ProjectsCard;
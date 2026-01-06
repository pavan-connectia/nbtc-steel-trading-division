import React from "react";
import { Heading, HyperLink, Img, Paragraph, SetInnerHtml } from "..";
import { twMerge } from "tailwind-merge";
import { LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const ProjectsCard = ({ projects, containerClass }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const defaultClass = twMerge(
    "row-span-6 max-h-[20rem] min-h-[20rem] max-w-[25rem] relative overflow-hidden group",
    containerClass,
  );

  return (
    <div className={defaultClass}>
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-b from-[#0B1228] to-[#0B1228]/0 hover:cursor-pointer group-hover:bg-blue/80"></div>
      <div className="absolute left-0 top-0 z-20 space-y-3 p-5">
        <Heading
          className="line-clamp-3 font-normal text-[#F8F9FD] md:text-base lg:text-[1.25rem]"
          children={projects?.title[currentLang]}
        />
        <Paragraph
          className="text-sm !text-[#F8F9FD]"
          children={projects?.location[currentLang]}
        />
        <hr className="w-[18rem]" />
        <SetInnerHtml
          className="line-clamp-4 text-sm text-[#F8F9FD]"
          text={projects?.description[currentLang]}
        />
        <HyperLink
          variant="filled"
          className="invisible group-hover:visible"
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

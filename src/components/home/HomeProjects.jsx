import React, { useState } from "react";
import { Button, Heading, HyperLink, Img, MaxContainer } from "../";
import { useTranslation } from "react-i18next";
import { useGetProjectsByDeptIdQuery } from "@/redux/api/projectsApi";
import ProjectsCard from "../projects/ProjectsCard";
import { LuArrowRight } from "react-icons/lu";

const HomeProjects = () => {
  const { t } = useTranslation();
  const { data } = useGetProjectsByDeptIdQuery();
  const [selectedOption, setSelectedOption] = useState("kuwait");

  const options = [
    { key: "kuwait", label: `kuwait` },
    { key: "ksa", label: `ksa` },
    { key: "auh", label: `auh` },
  ];

  const fltrData = data?.data?.filter((d) => {
    return d.region === selectedOption;
  });

  return (
    <div className="bg-white p-5 md:px-8 md:py-10">
      <MaxContainer className="max-w-[1200px] space-y-4">
        <Heading variant="small">{t("home.our_works")}</Heading>
        <Heading variant="big">{t("home.our_projects")}</Heading>

        <div className="flex items-center justify-center gap-x-3 pt-3">
          {options.map(({ key, label }) => (
            <Button
              key={key}
              onClick={() => setSelectedOption(key)}
              className={`${
                selectedOption === key
                  ? "bg-blue text-white"
                  : "border-blue bg-white text-blue"
              } rounded border px-4 py-2 uppercase`}
              text={label}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {fltrData?.slice(0, 5)?.map((d, idx) => (
            <ProjectsCard
              containerClass={`${
                idx !== 0
                  ? "row-span-6 max-h-[20rem] min-h-[20rem]"
                  : "row-span-12 min-h-[41.25rem] max-h-[41.25rem]"
              } relative overflow-hidden group`}
              key={d?._id}
              projects={d}
            />
          ))}
        </div>
        <HyperLink
          children={t("home.view_all_projects")}
          icon={<LuArrowRight className="rtl:rotate-180" />}
          variant="outline"
          className="mx-auto"
          href={"/projects"}
        />
      </MaxContainer>
    </div>
  );
};

export default HomeProjects;

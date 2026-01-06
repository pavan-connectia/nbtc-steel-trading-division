import React, { useEffect, useState } from "react";
import { Button, Head, Heading, Hero, MaxContainer } from "@/components";
import projectsImg from "@/assets/hero/projects.webp";
import ProjectsCard from "@/components/projects/ProjectsCard";
import { useGetProjectsByDeptIdQuery } from "@/redux/api/projectsApi";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();
  const { data } = useGetProjectsByDeptIdQuery();

  const options = [
    { key: "kuwait", label: `kuwait` },
    { key: "ksa", label: `ksa` },
    { key: "auh", label: `auh` },
  ];

  const [selectedOption, setSelectedOption] = useState("kuwait");

  const fltrData = data?.data?.filter((d) => {
    return d.region === selectedOption;
  });

  return (
    <>
      <Head
        title={data?.data?.projects?.seo?.title || "Projects | NBTC"}
        description={
          data?.data?.projects?.seo?.metaDescription || "Description"
        }
        canonical={data?.data?.projects?.seo?.canonicalUrl}
        ogUrl={data?.data?.projects?.seo?.ogUrl}
        ogImage={data?.data?.projects?.seo?.ogImage}
        keywords={data?.dat?.projects?.seo?.metaKeywords}
      />
      <Hero src={projectsImg} heading={t("nav.projects.title")} />

      <MaxContainer className="max-w-[1200px] px-3">
        <Heading variant="big" className="pb-6 pt-10 uppercase">
          {t("nav.projects.title")}
        </Heading>

        <div className="flex max-w-[1200px] items-center justify-center gap-x-3 overflow-hidden pt-3">
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

        <div className="grid grid-cols-1 gap-5 pb-20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {fltrData?.map((d) => (
            <ProjectsCard key={d?._id} projects={d} />
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default Projects;

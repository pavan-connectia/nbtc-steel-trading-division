import React from "react";
import message from "@/assets/hero/message.webp";
import { Heading, Img, MaxContainer, Hero, Head } from "@/components";
import { useGetAboutusByDeptIdQuery } from "@/redux/api/aboutusApi";
import { useTranslation } from "react-i18next";

const ExecutiveManagement = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetAboutusByDeptIdQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const aboutusData = data?.data || {};

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "About | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero
        src={message}
        heading={t("nav.about.submenu.executiveManagement")}
      />

      <MaxContainer className="px-5 py-10 md:gap-8 md:py-20">
        <Heading variant="big" className={"uppercase"}>
          {t("about.our_executive_management")}
        </Heading>
        <div className="flex flex-wrap justify-center gap-5 py-10">
          {aboutusData?.management?.map((m) => (
            <div
              className="h-[29rem] w-full max-w-[23rem] border bg-white"
              key={m?._id}
            >
              <Img
                dynamic
                src={m?.image}
                className="h-[24rem] w-full object-contain object-top"
              />
              <Heading
                variant={"small"}
                children={m?.name[currentLang]}
                className={"text-blue md:text-xl"}
              />
              <Heading
                variant={"small"}
                children={m?.designation[currentLang]}
                className={"text-red"}
              />
            </div>
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default ExecutiveManagement;

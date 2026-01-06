import React from "react";
import OurMilestones from "@/components/home/OurMilestones";
import about from "@/assets/hero/about.webp";
import {
  Heading,
  Img,
  MaxContainer,
  Hero,
  SetInnerHtml,
  Head,
} from "@/components";
import { useGetAboutusByDeptIdQuery } from "@/redux/api/aboutusApi";
import { useTranslation } from "react-i18next";

const CorparateProfilePage = () => {
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
      <Hero src={about} heading={t("about.about_us")} />

      <MaxContainer className="px-5 py-10 md:gap-8 md:py-20">
        <Heading variant="big" className="text-left rtl:text-right">
          {t("about.our_corporate_profile")}
        </Heading>
        <div className="flex flex-col justify-between gap-5 py-5 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <SetInnerHtml
              className="text-blue sm:text-lg"
              text={aboutusData?.profile?.description[currentLang]}
            />
          </div>

          <div className="h-[25rem] w-full bg-black lg:w-1/2 xl:h-[20rem]">
            <Img
              dynamic
              src={aboutusData?.profile?.image}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 py-10 sm:gap-8 md:py-16 lg:flex-row">
          <div className="h-[25rem] w-full flex-shrink-0 bg-black lg:w-1/2 xl:h-[20rem]">
            <Img
              dynamic
              src={aboutusData?.profile?.image2}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-2">
            <Heading variant="big" className="text-left rtl:text-right">
              {t("about.about_division")}
            </Heading>
            <SetInnerHtml
              className="text-blue sm:text-lg"
              text={aboutusData?.profile?.description2[currentLang]}
            />
          </div>
        </div>

        <SetInnerHtml
          className="text-blue sm:text-lg"
          text={aboutusData?.profile?.description3[currentLang]}
        />

        <SetInnerHtml
          className="mx-auto my-5 w-full max-w-4xl bg-white p-3 text-center text-red md:p-8 md:text-lg lg:text-xl"
          text={aboutusData?.profile?.quote[currentLang]}
        />
      </MaxContainer>

      <div className="py-10">
        <OurMilestones />
      </div>
    </>
  );
};

export default CorparateProfilePage;

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
import { useTranslation } from "react-i18next";
import { useGetHomeByDeptIdQuery } from "@/redux/api/homeApi";
import { useGetBannerImagesQuery } from "@/redux/api/bannerApi";

export default function VisionMissionValues() {
  const { t, i18n } = useTranslation();
  const { data } = useGetHomeByDeptIdQuery();
   const { data:banner, isLoading } = useGetBannerImagesQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const aboutusData = data?.data || {};

  return (
           <>
      <Head title={"Vision Mission Values | NBTC"} />

      <Hero
        src={`${import.meta.env.VITE_API_BASE_URL}/${banner?.data?.vision?.image}`}
        heading={t("about.visionMissionValues")}
      />

      <MaxContainer className="max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">

        <section className="space-y-4 ">
          <Heading
            variant="big"
            className="text-left rtl:text-right text-xl sm:text-2xl lg:text-3xl"
          >
            {t("home.vision")}
          </Heading>

          <SetInnerHtml
            className="text-blue text-sm sm:text-base ml-4 lg:text-lg leading-relaxed"
            text={aboutusData?.vision?.[currentLang]}
          />
        </section>

        <section className="mt-10 sm:mt-14 lg:mt-16 space-y-4 ">
          <Heading
            variant="big"
            className="text-left rtl:text-right text-xl sm:text-2xl lg:text-3xl"
          >
            {t("home.mission")}
          </Heading>

          <SetInnerHtml
            className="text-blue text-sm sm:text-base ml-4 lg:text-lg leading-relaxed"
            text={aboutusData?.mission?.[currentLang]}
          />
        </section>

        <section className="mt-10 sm:mt-14 lg:mt-16 space-y-4 ">
          <Heading
            variant="big"
            className="text-left rtl:text-right text-xl sm:text-2xl lg:text-3xl"
          >
            {t("home.value")}
          </Heading>

          <div className="prose-li:list-disc max-w-none">
            <SetInnerHtml
              className="text-blue text-sm sm:text-base ml-4 lg:text-lg leading-relaxed"
              text={aboutusData?.value?.[currentLang]}
            />
          </div>
        </section>

      </MaxContainer>

      <div className="py-8 sm:py-10 lg:py-14">
        <OurMilestones />
      </div>
    </>
  );
}

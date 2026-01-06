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

export default function VisionMissionValues() {
  const { t, i18n } = useTranslation();
  const { data } = useGetHomeByDeptIdQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const aboutusData = data?.data || {};

  return (
    <>
      <Head title={"Vision Mission Values | NBTC"} />
      <Hero src={about} heading={t("about.visionMissionValues")} />

      <MaxContainer className="max-w-6xl space-y-5 px-5 py-10 md:gap-8 md:py-20">
        <div>
          <Heading
            variant="big"
            className="text-left capitalize rtl:text-right"
          >
            {t("home.vision")}
          </Heading>
          <SetInnerHtml
            className={"text-blue sm:text-lg"}
            text={aboutusData?.vision?.[currentLang]}
          />
        </div>

        <div>
          <Heading
            variant="big"
            className="text-left capitalize rtl:text-right"
          >
            {t("home.mission")}
          </Heading>
          <SetInnerHtml
            className={"text-blue sm:text-lg"}
            text={aboutusData?.mission?.[currentLang]}
          />
        </div>

        <div>
          <Heading
            variant="big"
            className="text-left capitalize rtl:text-right"
          >
            {t("home.value")}
          </Heading>
          <SetInnerHtml
            className={"px-5 text-blue sm:text-lg"}
            text={aboutusData?.value?.[currentLang]}
          />
        </div>
      </MaxContainer>

      <div className="py-10">
        <OurMilestones />
      </div>
    </>
  );
}

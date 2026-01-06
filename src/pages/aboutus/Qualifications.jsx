import React from "react";
import qualification from "@/assets/hero/qualification.webp";
import { MaxContainer, Hero, Head, SetInnerHtml } from "@/components";
import { useGetQualificationQuery } from "@/redux/api/qualificationApi";
import { useTranslation } from "react-i18next";

const Qualifications = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetQualificationQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const qualificationData = data?.data;

  return (
    <>
      <Head
        title={qualificationData?.seo?.title || "Qualifications | NBTC"}
        description={qualificationData?.seo?.metaDescription || ""}
        canonical={qualificationData?.seo?.canonicalUrl}
        ogUrl={qualificationData?.seo?.ogUrl}
        ogImage={qualificationData?.seo?.ogImage}
        keywords={qualificationData?.seo?.metaKeywords}
      />

      <Hero
        src={qualification}
        heading={t("nav.about.submenu.qualifications")}
      />

      <MaxContainer className="px-5 py-10 md:gap-8 md:py-20">
        <SetInnerHtml
          className="text-blue"
          text={qualificationData?.description?.[currentLang]}
        />
      </MaxContainer>
    </>
  );
};

export default Qualifications;

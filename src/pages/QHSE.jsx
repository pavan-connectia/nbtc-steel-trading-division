import React, { useState } from "react";
import qhse from "@/assets/hero/qhse.webp";
import {
  MaxContainer,
  Img,
  Heading,
  Hero,
  SetInnerHtml,
  Head,
  Button,
} from "@/components";
import AwardsCard from "@/components/awards/AwardsCard";
import { useGetAwardsQuery } from "@/redux/api/awardsApi";
import { useGetQhseQuery } from "@/redux/api/qhseApi";
import { useTranslation } from "react-i18next";

export default function HSE() {
  const { t, i18n } = useTranslation();
  const { data } = useGetAwardsQuery();
  const { data: hse } = useGetQhseQuery();
  const [selectedOption, setSelectedOption] = useState("quality");
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const handleClick = (key) => {
    setSelectedOption(key);
  };

  const fltrData = data?.data?.filter((d) => d.type === selectedOption);
  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Qhse | NBTC"}
        description={data?.data?.seo?.metaDescription}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={qhse} heading={t("nav.qhse.title")} />

      <MaxContainer className="px-5 py-6 md:py-8 lg:py-10">
        <div className="mt-5 flex flex-col gap-5 md:flex-row md:gap-8 lg:gap-10">
          <div className="md:w-1/2">
            <Img
              dynamic
              src={hse?.data?.quality?.image}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <SetInnerHtml
              text={hse?.data?.quality?.description[currentLang]}
              className="text-blue"
            />
          </div>
        </div>

        <div className="my-20 bg-textGray px-5 md:px-8 md:pt-8">
          <MaxContainer className="space-y-4">
            <Heading variant="big">
              {t("home.certifications_recognitions")}
            </Heading>
            <div className="flex items-center justify-center gap-x-3 pt-3">
              {[
                { key: "quality", label: `${t("home.quality")}` },
                { key: "hse", label: `${t("home.hse")}` },
                { key: "accredetions", label: `${t("home.accredetions")}` },
                { key: "recognition", label: `${t("home.recognitions")}` },
                
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  onClick={() => handleClick(key)}
                  variant={
                    selectedOption === key ? "primary" : "primaryOutline"
                  }
                  text={label}
                />
              ))}
            </div>
            <div className="scrollbar-hide flex flex-wrap items-center gap-5 py-5 md:gap-8 lg:justify-center lg:gap-10">
              {fltrData?.map((d) => (
                <AwardsCard key={d._id} image={d?.image} name={d?.name} />
              ))}
            </div>
          </MaxContainer>
        </div>
      </MaxContainer>
    </>
  );
}

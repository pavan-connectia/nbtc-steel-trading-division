import React from "react";
import associatesImg from "@/assets/hero/associates.webp";
import {
  Card,
  Heading,
  Img,
  MaxContainer,
  Paragraph,
  Hero,
  Head,
} from "@/components";
import { useGetAfflicatesQuery } from "@/redux/api/afflicatesApi";
import { useTranslation } from "react-i18next";

const Subsidiary = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetAfflicatesQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Subsidiary | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />

      <Hero
        src={associatesImg}
        heading={t("about.associates_and_affiliates")}
      />

      <MaxContainer className="px-5 py-10 md:gap-8 md:py-20">
        <Heading variant="big" className="uppercase">
          {t("home.our_associates_affiliates")}
        </Heading>
        <div className="grid grid-cols-1 justify-center gap-5 py-10 md:grid-cols-2">
          {data?.data?.map((d) => (
            <Card
              className="lg:p-5~ flex flex-col justify-between gap-8 p-2 sm:p-4 lg:flex-row"
              key={d?._id}
            >
              <Img
                src={d?.image}
                dynamic
                className="my-auto min-h-[3rem] w-[7rem] object-contain"
              />
              <div>
                <Heading
                  variant="big"
                  className={
                    "text-left text-lg text-blue sm:text-xl md:text-2xl lg:text-2xl rtl:text-right"
                  }
                  children={d?.name[currentLang]}
                />
                <Paragraph
                  className={"flex-shrink text-xs sm:text-sm md:text-base"}
                >
                  {d?.description[currentLang]}
                </Paragraph>
              </div>
            </Card>
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default Subsidiary;

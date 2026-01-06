import React from "react";
import { Heading, Hero, Head, MaxContainer, SetInnerHtml } from "@/components";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useGetLatestNewsByIdQuery } from "@/redux/api/newsApi";
import { useTranslation } from "react-i18next";

const News = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { data, isLoading } = useGetLatestNewsByIdQuery(id);
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "News | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero dynamic src={data?.data?.image}>
        <div className="absolute bottom-5 px-3 sm:bottom-10 sm:px-5">
          <Heading className="text-whie z-20 w-full text-left font-semibold uppercase !text-white sm:text-xl md:text-2xl lg:text-3xl rtl:text-right">
            {data?.data?.title?.[currentLang] || ""}
          </Heading>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-white">
            <div className="flex items-center gap-1">
              <LuCalendarDays />
              <p className="font-kanit">{data?.data?.date}</p>
            </div>

            <div className="flex items-center gap-1">
              <LuMapPin />
              <p className="font-kanit">{data?.data?.location[currentLang]}</p>
            </div>
          </div>
        </div>
      </Hero>

      <MaxContainer className="px-5 py-10 md:gap-8 md:py-16">
        <SetInnerHtml
          text={data?.data?.description[currentLang]}
          className="text-sm text-blue md:text-base"
        />
      </MaxContainer>
    </>
  );
};

export default News;

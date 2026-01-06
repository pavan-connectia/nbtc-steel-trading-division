import React from "react";
import message from "@/assets/hero/message.webp";
import {
  Heading,
  MaxContainer,
  Hero,
  Head,
  Card,
  Img,
  SetInnerHtml,
} from "@/components";
import { useGetCsrQuery } from "@/redux/api/newsApi";
import { useTranslation } from "react-i18next";

const CSR = () => {
  const { i18n } = useTranslation();
  const { data } = useGetCsrQuery();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "CSR | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={message} heading={"CORPORATE SOCIAL RESPONSIBILITY"} />
      <MaxContainer className="max-w-[1200px] px-5 py-10 md:gap-8 md:py-16">
        <div className="flex flex-wrap justify-center gap-5 py-10 md:gap-8">
          {data?.data?.map((d) => (
            <Card
              className="flex flex-col gap-8 bg-white p-3 sm:flex-row"
              key={d?._id}
            >
              <Img
                dynamic
                src={d?.image}
                className="h-[150px] w-[250px] flex-shrink-0 object-contain"
              />
              <div>
                <Heading className="mt-3 text-left text-2xl font-semibold text-red rtl:text-right">
                  {d?.title[currentLang] || ""}
                </Heading>

                <SetInnerHtml
                  text={d?.description[currentLang] || ""}
                  className="text-blue"
                />
              </div>
            </Card>
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default CSR;

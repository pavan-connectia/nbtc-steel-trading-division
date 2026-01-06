import React from "react";
import {
  Head,
  Heading,
  Hero,
  Img,
  MaxContainer,
  SetInnerHtml,
} from "@/components";
import contactImg from "@/assets/hero/contact.webp";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetBrandsByIdQuery } from "@/redux/api/brandsApi";

const Brands = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const { data } = useGetBrandsByIdQuery(id);
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Brands | NBTC"}
        description={data?.data?.seo?.metaDescription}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={contactImg} heading={"Brands"} />

      <MaxContainer className="max-w-[1200px] space-y-20 px-3 py-5">
        <div className="mt-10 flex flex-col justify-between gap-5 md:flex-row lg:gap-8">
          <div className="space-y-3">
            <Heading variant="big" className="text-left uppercase">
              {data?.data?.name?.[currentLang]}
            </Heading>
            <Img
              dynamic
              src={data?.data?.image}
              className="h-[10rem] w-[15rem] max-w-sm object-contain"
            />

            <SetInnerHtml
              text={data?.data?.description?.[currentLang]}
              className="text-sm md:text-base"
            />
          </div>
        </div>
      </MaxContainer>
    </>
  );
};

export default Brands;

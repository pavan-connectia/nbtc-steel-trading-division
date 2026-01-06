import React from "react";
import message from "@/assets/hero/message.webp";
import {
  Heading,
  Img,
  MaxContainer,
  Hero,
  SetInnerHtml,
  Head,
} from "@/components";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useGetAboutusByDeptIdQuery } from "@/redux/api/aboutusApi";
import { useTranslation } from "react-i18next";

const ChairManMsg = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetAboutusByDeptIdQuery();

  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const chairmanMsg = data?.data?.chairmanMsg || {};

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
      <Hero src={message} heading={t("nav.about.submenu.chairmanMsg")} />

      <MaxContainer className="px-5 py-6 md:gap-8 md:py-10">
        <div className="justify-cente mx-auto flex max-w-5xl flex-col-reverse gap-10 py-10 sm:py-12 md:py-16 lg:flex-row lg:items-start lg:py-20">
          <div className="mx-auto">
            <div className="mr-auto max-w-lg font-medium">
              <FaQuoteLeft className="text-blue rtl:hidden" />
              <FaQuoteRight className="text-blue ltr:hidden" />
              <SetInnerHtml
                className="px-2 py-2 text-blue"
                text={chairmanMsg?.message?.[currentLang]}
              />
            </div>
            <Heading
              className={
                "font-kanit py-5 text-left text-lg font-semibold italic text-blue sm:text-xl md:text-2xl lg:text-3xl rtl:text-right"
              }
            >
              {chairmanMsg?.name?.[currentLang]}
            </Heading>
          </div>

          <div className="mx-auto h-[30rem] w-full lg:w-1/2 xl:h-[24rem]">
            <Img
              dynamic
              src={chairmanMsg?.image}
              className="mx-auto h-full object-contain lg:mx-0 lg:ml-auto"
            />
          </div>
        </div>

        <SetInnerHtml
          className="mx-auto w-fit max-w-5xl bg-red px-3 py-2 text-white sm:px-5 sm:py-4 lg:text-lg"
          text={chairmanMsg?.quote?.[currentLang]}
        />

        <SetInnerHtml
          variant="big"
          className="mx-auto my-10 w-full bg-white p-3 text-center text-red md:p-5 lg:text-xl"
          text={chairmanMsg?.smallQuote?.[currentLang]}
        />
      </MaxContainer>
    </>
  );
};

export default ChairManMsg;

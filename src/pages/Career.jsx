import React, { useRef, useState } from "react";
import {
  MaxContainer,
  Heading,
  Hero,
  Img,
  SetInnerHtml,
  Button,
  Head,
} from "@/components";
import careerImg from "@/assets/hero/career.webp";
import CareerForm from "@/components/career/CareerForm";
import CareerOptions from "@/components/career/CareerOptions";
import {
  useGetCareersOpeningByDeptIdQuery,
  useGetCareersInfoQuery,
} from "@/redux/api/careersApi";
import { useTranslation } from "react-i18next";
import useClickOutside from "@/hooks/useClickOutside";

const Career = () => {
  const { t, i18n } = useTranslation();
  const imgRef = useRef();
  const [showNotice, setShowNotice] = useState(false);
  const { data: careerOpening } = useGetCareersOpeningByDeptIdQuery();
  const { data } = useGetCareersInfoQuery();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  useClickOutside(imgRef, () => setShowNotice(false));

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Careers | NBTC"}
        description={data?.data?.seo?.metaDescription}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={careerImg} heading={t("nav.careers")} />

      <MaxContainer className="max-w-[1200px] px-5 py-10 sm:py-12 md:py-16">
        <Heading variant="big" className="pb-10 uppercase text-red">
          {t("careers.important_notice")}
        </Heading>

        <Button
          variant="primary"
          text={t("careers.view_important_notice")}
          className="mx-auto text-center"
          onClick={() => setShowNotice(!showNotice)}
        />

        {showNotice && (
          <div className="fixed right-0 top-0 z-[100] flex h-full w-full items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" />
            <div ref={imgRef}>
              <Img
                dynamic
                src={data?.data?.importNoticeImage}
                className="relative z-10 mx-auto max-h-[35rem] w-auto object-contain opacity-100"
                alt="Important Notice"
              />
            </div>
          </div>
        )}
        <Heading
          className="mt-10 text-left md:mt-16 lg:mt-20 rtl:text-right"
          variant="big"
        >
          {data?.data?.heading[currentLang] || ""}
        </Heading>
        <SetInnerHtml
          className="mt-3 text-blue md:text-lg"
          text={data?.data?.description[currentLang] || ""}
        />
        <div className="flex flex-col gap-5 py-10 sm:py-14 md:flex-row md:gap-8 md:py-16 lg:gap-10 lg:py-20">
          <div className="w-full md:w-1/2">
            <Heading
              variant="big"
              className="mb-5 text-lg text-red sm:text-xl md:text-2xl lg:text-3xl"
            >
              {t("careers.current_opening")}
            </Heading>
            {careerOpening?.data?.map((o) => (
              <CareerOptions key={o?._id} openings={o} />
            ))}
          </div>
          <div className="w-full md:w-1/2">
            <Heading
              variant="big"
              className="text-lg text-red sm:text-xl md:text-2xl lg:text-3xl"
            >
              {t("careers.choose_an_opening")}
            </Heading>
            <CareerForm />
          </div>
        </div>
      </MaxContainer>
    </>
  );
};

export default Career;

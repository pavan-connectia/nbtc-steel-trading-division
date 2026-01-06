import React from "react";
import camera from "@/assets/hero/camera.webp";
import { Heading, MaxContainer, Hero, Head } from "@/components";
import { useGetVideoGalleryByDeptIdQuery } from "@/redux/api/newsApi";
import { useTranslation } from "react-i18next";

export default function VideoGallery() {
  const { t, i18n } = useTranslation();
  const { data } = useGetVideoGalleryByDeptIdQuery();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Video Gallery | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={camera} heading={t("nav.news.submenu.videoGallery")} />
      <MaxContainer className="px-5 py-10 md:gap-8 md:py-16">
        <div className="flex flex-wrap justify-center gap-5 py-10 md:gap-8">
          {data?.data?.map((d) => (
            <div
              className="min-w-[22.5rem] max-w-[25.5rem] bg-white p-3"
              key={d?.id}
            >
              <iframe
                src={d?.video}
                dynamic
                className="min-h-[250px] w-full object-cover"
              />
              <Heading
                variant="small"
                className="mt-3 text-left text-blue rtl:text-right"
              >
                {d?.title[currentLang]}
              </Heading>
            </div>
          ))}
        </div>
      </MaxContainer>
    </>
  );
}

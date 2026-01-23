import React from "react";
import camera from "@/assets/hero/camera.webp";
import { Heading, MaxContainer, Hero, Head } from "@/components";
import { useGetLatestPublicationByDeptIdQuery } from "@/redux/api/newsApi";
import { useTranslation } from "react-i18next";
import message from "@/assets/hero/message.webp";
import PublicationCard from "@/components/news/PublicationCard";
import { useGetBannerImagesQuery } from "@/redux/api/bannerApi";

const Publications = () => {
  const { data } = useGetLatestPublicationByDeptIdQuery();
  const { t } = useTranslation();
   const { data:banner, isLoading } = useGetBannerImagesQuery();

  return <>
        <Head
        title={data?.data?.seo?.title || "Publication | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={`${import.meta.env.VITE_API_BASE_URL}/${banner?.data?.publication?.image}`} heading={"LATEST PUBLICATIONS"} />
      <MaxContainer className="px-5 py-10 md:gap-8 md:py-16">
        <div className="flex flex-wrap justify-center gap-5 py-10 md:gap-8">
          {data?.data?.map((d) => (
          <PublicationCard key={d._id} publication={d} />
          ))}
        </div>
      </MaxContainer>
  </>;
};

export default Publications;

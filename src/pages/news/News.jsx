import React from "react";
import message from "@/assets/hero/message.webp";
import { MaxContainer, Hero, Head } from "@/components";
import NewsCard from "@/components/news/NewsCard";
import { useGetLatestNewsByDeptIdQuery } from "@/redux/api/newsApi";
import { useGetBannerImagesQuery } from "@/redux/api/bannerApi";

const News = () => {
  const { data } = useGetLatestNewsByDeptIdQuery();
   const { data:banner, isLoading } = useGetBannerImagesQuery();

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
      <Hero src={`${import.meta.env.VITE_API_BASE_URL}/${banner?.data?.news?.image}`} heading={"LATEST NEWS"} />
      <MaxContainer className="px-5 py-10 md:gap-8 md:py-16">
        <div className="flex flex-wrap justify-center gap-5 py-10 md:gap-8">
          {data?.data?.map((d) => (
            <NewsCard key={d._id} news={d} />
          ))}
        </div>
      </MaxContainer>
    </>
  );
};

export default News;

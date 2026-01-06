import React, { useRef } from "react";
import { Button, Heading, MaxContainer } from "..";
import NewsCard from "../news/NewsCard";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useGetLatestNewsByDeptIdQuery } from "@/redux/api/newsApi";
import { useTranslation } from "react-i18next";

const FeaturedNews = () => {
  const { t } = useTranslation();
  const { data } = useGetLatestNewsByDeptIdQuery();

  const scrollContainerRef = useRef(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-20">
      <Heading variant="big">{t("home.featured_news")}</Heading>
      <MaxContainer className="relative">
        <Button
          icon={<LuArrowLeft size={20} />}
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 z-10 mx-5 hidden h-fit -translate-y-1/2 transform rounded-lg bg-blue px-2 text-white lg:block"
          aria-label="go to previous news"
        />
        <Button
          icon={<LuArrowRight size={20} />}
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 z-10 mx-5 hidden h-fit -translate-y-1/2 transform rounded-lg bg-blue px-2 text-white lg:block"
          aria-label="go to next news"
        />

        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex max-w-[1100px] justify-start gap-5 overflow-x-auto py-8 lg:mx-auto lg:overflow-x-hidden"
        >
          {data?.data?.map((d) => (
            <NewsCard key={d?._id} news={d} />
          ))}
        </div>
      </MaxContainer>
    </div>
  );
};

export default FeaturedNews;

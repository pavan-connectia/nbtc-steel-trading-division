import React, { useRef } from "react";
import { Button, Heading, MaxContainer, BrandsCard } from "..";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { useGetBrandsByDeptIdQuery } from "@/redux/api/brandsApi";

const HomeBrands = () => {
  const { t } = useTranslation();
  const { data } = useGetBrandsByDeptIdQuery();

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
      <Heading variant="big">{t("home.brands")}</Heading>
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
            <BrandsCard brand={d} key={d?._id} />
          ))}
        </div>
      </MaxContainer>
    </div>
  );
};

export default HomeBrands;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, HyperLink, Img, SetInnerHtml } from "..";
import { useTranslation } from "react-i18next";
import { useGetHomeByDeptIdQuery,  } from "@/redux/api/homeApi";
import { LuArrowRight } from "react-icons/lu";

export default function HeroSlider() {
  const { t, i18n } = useTranslation();
  const { data } = useGetHomeByDeptIdQuery();
  const homeData = data?.data || {};
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const settings = {
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };

  return (
    <Slider {...settings} className="relative w-full h-[43rem]">
      {homeData?.slider?.map((banner, index) => (
        <div key={index} className="w-full h-[43rem]">
          <Img
            dynamic
            src={banner?.image}
            loading="eager"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00215B] via-[rgba(0,33,91,0.75)] to-transparent" />

          <div className="absolute top-[30%] z-10 space-y-10 px-5 text-left md:px-8 rtl:text-right">
            <SetInnerHtml
              className="font-kanit mb-4 !text-2xl font-medium !leading-none text-white sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl"
              text={banner?.heading?.[currentLang]}
            />
            <SetInnerHtml
              className="max-w-3xl mb-6 text-sm font-lato text-textGray sm:text-base"
              text={banner?.description?.[currentLang]}
            />
            <HyperLink
              className="text-white bg-red"
              icon={<LuArrowRight className="rtl:rotate-180" />}
              href={banner?.learnMore || ""}
              text={t("home.learn_more")}
            >
              {t("home.learn_more")}
            </HyperLink>
          </div>
        </div>
      ))}

      <div className="mx-auto max-w-[1280px]">
        <div className="absolute top-[30%] z-10 space-y-10 px-5 text-left md:px-8 rtl:text-right">
          <SetInnerHtml
            className="font-kanit mb-4 !text-2xl font-medium !leading-none text-white sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl"
            text={homeData?.heading?.[currentLang]}
          />
          <SetInnerHtml
            className="max-w-3xl mb-6 text-sm font-lato text-textGray sm:text-base"
            text={homeData?.description?.[currentLang]}
          />
          <Button
            className="text-white bg-red"
            icon={<LuArrowRight className="rtl:rotate-180" />}
            href={homeData?.learnMore || ""}
            text={t("home.learn_more")}
            onClick={() => {
              const element = document.getElementById("learnmore");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("home.learn_more")}
          </Button>
        </div>
      </div>
    </Slider>
  );
}

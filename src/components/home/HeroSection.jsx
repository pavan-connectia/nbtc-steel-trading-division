import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { Button, Img, SetInnerHtml } from "../";
import { useGetHomeByDeptIdQuery } from "@/redux/api/homeApi";
import { useTranslation } from "react-i18next";
import HomeStatistics from "./HomeStatistics";
import HeroSlider from "./HeroSlider";

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const { data } = useGetHomeByDeptIdQuery();
  const homeData = data?.data || {};
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <div className="relative h-[43rem] w-full">
      {homeData?.heroType === "video" && (
        <video
          className="object-cover w-full h-full"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
        >
          <source src={import.meta.env.VITE_API_BASE_URL + homeData?.video} />
        </video>
      )}

      {homeData?.heroType == "image" && (
        <Img
          dynamic
          src={homeData?.banner}
          loading="eager"
          className="object-cover w-full h-full"
        />
      )}

      {homeData?.heroType === "slider" && <HeroSlider />}

      {homeData?.heroType !== "slider" && (
        <div className="mx-auto max-w-[1280px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00215B] via-[rgba(0,33,91,0.75)] to-transparent" />
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
      )}

      <div
        className="scrollbar-hide absolute top-[40rem] z-40 mx-auto flex w-full max-w-[1280px] justify-between gap-5 overflow-x-auto px-10"
        id="learnmore"
      >
        <HomeStatistics />
      </div>
    </div>
  );
}

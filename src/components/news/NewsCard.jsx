import React from "react";
import { LuArrowRight, LuCalendarDays, LuMapPin } from "react-icons/lu";
import { Heading, HyperLink, Paragraph, Img } from "..";
import { stripHtml } from "@/utils/truncateHtml";
import { useTranslation } from "react-i18next";

const NewsCard = ({ news }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <div className="min-w-[22.5rem] max-w-[22.5rem] bg-white p-3">
      <Img
        dynamic
        src={news?.image}
        className="max-h-[223px] w-full object-cover"
      />
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 text-blue">
            <LuCalendarDays />
            <p className="font-kanit text-xs font-light">{news?.date}</p>
          </div>

          <div className="flex items-center gap-1 text-blue">
            <LuMapPin />
            <p className="font-kanit text-xs font-light">
              {news?.location[currentLang]}
            </p>
          </div>
        </div>
        <Heading
          className="line-clamp-1 text-left text-base font-medium text-blue rtl:text-right"
          variant="small"
          children={news?.title?.[currentLang]}
        />
        <Paragraph
          children={stripHtml(news?.description?.[currentLang])}
          className="line-clamp-2 text-sm"
        />

        <HyperLink
          href={`/news/${news?.href}`}
          variant="outline"
          className="border-transparent px-2 py-1 text-red"
          icon={<LuArrowRight className="rtl:rotate-180" />}
        >
          {t("news.readmore")}
        </HyperLink>
      </div>
    </div>
  );
};

export default NewsCard;

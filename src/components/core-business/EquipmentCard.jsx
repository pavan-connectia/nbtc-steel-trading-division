import React from "react";
import { Card, Heading, HyperLink, Img } from "..";
import { LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { stripHtml } from "@/utils/truncateHtml";

const EquipmentCard = ({ equipment }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <Card
      className="group min-w-[320px] max-w-[320px] space-y-4 border-red p-4 transition-all hover:border-t-4"
      key={equipment?._id}
    >
      <div className="flex w-full justify-center">
        <Img
          dynamic
          src={equipment?.image}
          className="h-[11rem] w-full object-contain"
        />
      </div>
      <div>
        <Heading
          variant="small"
          children={equipment?.name?.[currentLang] || ""}
          className="text-left text-blue rtl:text-right"
        />
        <Heading
          className="line-clamp-2 font-light text-[#747D8F]"
          children={stripHtml(equipment?.description?.[currentLang] || "")}
          Tag="p"
        />
        <HyperLink
          variant="outline"
          children="Explore More"
          href={
            `/products-service/equipments/${equipment?.href}/${equipment?._id}` ||
            ""
          }
          className="border-transparent pl-0 transition-all hover:border-red hover:pl-3"
          icon={<LuArrowRight className="rtl:rotate-180" />}
        >
          {t("coreBusiness.explore_more")}
        </HyperLink>
      </div>
    </Card>
  );
};

export default EquipmentCard;

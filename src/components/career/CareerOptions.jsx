import React, { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Card, Heading, SetInnerHtml } from "..";
import { useTranslation } from "react-i18next";

const CareerOptions = ({ openings }) => {
  const { t, i18n } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <button
      onClick={() => setIsHidden(!isHidden)}
      className="w-full space-y-3 py-5"
    >
      <div className="flex items-center justify-between bg-accent px-5 py-3">
        <Heading
          variant="small"
          children={openings?.title[currentLang || ""]}
          className="text-blue"
        />
        {!isHidden ? (
          <LuPlus
            className="text-blue opacity-70"
            strokeWidth={2.4}
            size={25}
          />
        ) : (
          <LuMinus
            className="text-blue opacity-70"
            strokeWidth={2.4}
            size={25}
          />
        )}
      </div>

      {isHidden && (
        <Card className="w-full space-y-2 px-5 py-5">
          <Heading className="text-left rtl:text-right" variant="small">
            {openings?.vacancy} {t("careers.vacancy")}
          </Heading>
          <Heading
            className="text-left text-blue rtl:text-right"
            variant="small"
          >
            {t("careers.location")} : {openings?.location[currentLang] || ""}
          </Heading>
          <Heading
            className="text-left text-blue rtl:text-right"
            variant="small"
          >
            {t("careers.description")}
          </Heading>
          <SetInnerHtml
            text={openings?.description[currentLang] || ""}
            className="text-left text-blue"
          />
        </Card>
      )}
    </button>
  );
};

export default CareerOptions;

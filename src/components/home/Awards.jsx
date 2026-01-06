import React, { useState } from "react";
import { Button, Heading, HyperLink, MaxContainer } from "../";
import AwardsCard from "../awards/AwardsCard";
import { LuArrowRight } from "react-icons/lu";
import { useGetAwardsQuery } from "@/redux/api/awardsApi";
import { useTranslation } from "react-i18next";

export default function Awards() {
  const { t } = useTranslation();
  const { data } = useGetAwardsQuery();
  const [selectedOption, setSelectedOption] = useState("quality");

  const handleClick = (key) => {
    setSelectedOption(key);
  };

  const fltrData = data?.data?.filter((d) => d.type === selectedOption);

  return (
    <div className="bg-textGray px-5 pb-20 pt-5 md:px-8 md:pt-8">
      <MaxContainer className="space-y-4">
        <Heading variant="big">{t("home.certifications_recognitions")}</Heading>
        <div className="flex items-center justify-center gap-x-3 pt-3">
          {[
            { key: "quality", label: `${t("home.quality")}` },
            { key: "hse", label: `${t("home.hse")}` },
            { key: "accredetions", label: `${t("home.accredetions")}` },
            { key: "recognition", label: `${t("home.recognitions")}` },
          ].map(({ key, label }) => (
            <Button
              key={key}
              onClick={() => handleClick(key)}
              variant={selectedOption === key ? "primary" : "primaryOutline"}
              text={label}
            />
          ))}
        </div>
        <div className="scrollbar-hide flex items-center gap-5 overflow-x-auto py-5 md:gap-8 lg:justify-center lg:gap-10">
          {fltrData?.slice(0, 3)?.map((d) => (
            <AwardsCard key={d._id} image={d?.image} name={d?.name} />
          ))}
        </div>
        <HyperLink
          children={t("home.view_all_certifications")}
          icon={<LuArrowRight className="rtl:rotate-180" />}
          variant="outline"
          className="mx-auto"
          href={"/qhse"}
        />
      </MaxContainer>
    </div>
  );
}

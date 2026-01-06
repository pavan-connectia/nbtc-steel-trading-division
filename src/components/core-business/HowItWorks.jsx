import React from "react";
import { Heading, Card, MaxContainer, Img, Paragraph } from "..";
import message from "@/assets/icons/message.svg";
import receipt from "@/assets/icons/receipt.svg";
import delievery from "@/assets/icons/delievery.svg";
import { useTranslation } from "react-i18next";

const HowItWorks = ({ image }) => {
  const { t } = useTranslation();
  const datas = [
    {
      _id: "1",
      icon: message,
      title: t("coreBusiness.discuss_project_needs"),
      description: t("coreBusiness.discuss_project_needs_desc"),
    },
    {
      _id: "2",
      icon: receipt,
      title: t("coreBusiness.free_quote_agreement"),
      description: t("coreBusiness.free_quote_agreement_desc"),
    },
    {
      _id: "3",
      icon: delievery,
      title: t("coreBusiness.delivery_support"),
      description: t("coreBusiness.delivery_support_desc"),
    },
  ];

  return (
    <Card className="px-5 py-8">
      <Heading variant="big">{t("coreBusiness.how_it_works")}</Heading>
      <MaxContainer className="flex flex-col justify-between gap-5 py-5 md:flex-row md:gap-8 lg:gap-10">
        <Img dynamic className="h-auto max-w-[31rem]" src={image} />

        <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {datas.map((d) => (
            <div className="space-y-2" key={d?._id}>
              <Img className="size-12 object-contain" src={d?.icon} />
              <Heading
                variant="small"
                className="text-left font-semibold normal-case text-blue rtl:text-right"
              >
                {d?.title}
              </Heading>

              <Paragraph children={d?.description} />
            </div>
          ))}
        </div>
      </MaxContainer>
    </Card>
  );
};

export default HowItWorks;

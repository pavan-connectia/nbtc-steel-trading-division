import React, { useState } from "react";
import {
  Heading,
  Img,
  Card,
  MaxContainer,
  Button,
  Paragraph,
  SetInnerHtml,
  QuotationForm,
} from "..";
import { useTranslation } from "react-i18next";

const EquimentsDetails = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <MaxContainer className="max-w-[1230px]">
      <div className="flex flex-col gap-5 px-5 py-10 md:gap-8 lg:gap-10 xl:flex-row">
        <div className="flex flex-col-reverse gap-5 md:flex-row xl:w-[60%]">
          <div className="scrollbar-hide flex flex-shrink-0 flex-row gap-4 overflow-x-auto md:flex-col">
            {data?.photos?.map((p) => (
              <Card
                className="border-red hover:border-t-4"
                key={p?._id}
                onClick={() => setSelectedImg(p)}
              >
                <Img dynamic src={p} className="h-28 w-32 object-contain" />
              </Card>
            ))}
          </div>

          <Card className="max-h-[27rem] max-w-[34rem] flex-shrink-0 md:h-[27rem] md:w-[34rem]">
            <Img
              dynamic
              className="h-full w-full object-contain"
              src={selectedImg || data?.image || ""}
            />
          </Card>
        </div>

        <div className="space-y-1 xl:w-[43%]">
          <Heading variant="big" className="text-left">
            {data?.name?.[currentLang]}
          </Heading>

          <div className="my-5">
            {data?.specification?.slice(0, 4)?.map((s) => (
              <SpecTable
                title={s?.label[currentLang]}
                desc={s?.value[currentLang]}
                key={s?._id}
              />
            ))}
          </div>

          <SetInnerHtml text={data?.description?.[currentLang] || ""} />

          <Button
            onClick={() => setShowModal(true)}
            text={t("coreBusiness.request_quote")}
            variant="secondaryOutline"
            className="!my-5 w-full"
          />
        </div>
      </div>

      <QuotationForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        department={data?.department}
        title={data?.name?.[currentLang]}
      />
    </MaxContainer>
  );
};

export default EquimentsDetails;

function SpecTable({ title, desc }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-accent py-3 pl-4">
      <Paragraph className="font-semibold">{title}</Paragraph>
      <Paragraph>{desc}</Paragraph>
    </div>
  );
}

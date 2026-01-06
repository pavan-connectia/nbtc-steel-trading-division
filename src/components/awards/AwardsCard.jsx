import React, { useState } from "react";
import { Button, Card, Heading, Img, Modal } from "..";
import { LuArrowRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const AwardsCard = ({ image, name }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="min-w-[302px] max-w-[302px]">
        <Img dynamic src={image} className="h-[428px] w-full object-cover" />
        <Heading
          className="mt-2 break-words px-1 text-blue"
          variant="small"
          Tag="p"
        >
          {name?.[currentLang] || ""}
        </Heading>
        <Button
          text="View"
          icon={<LuArrowRight />}
          variant="secondaryOutline"
          className="mx-auto mb-2 border-transparent hover:bg-transparent hover:text-red md:text-lg"
          onClick={() => setIsModalOpen(true)}
        />
      </Card>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <Img
              dynamic
              src={image}
              className="max-h-[90vh] max-w-full object-contain"
            />
            <Heading
              className="mt-2 break-words px-1 text-white"
              variant="small"
              Tag="p"
            >
              {name?.[currentLang] || ""}
            </Heading>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AwardsCard;

import React, { useRef } from "react";
import { Button, Heading, HyperLink, MaxContainer } from "..";
import EquipmentsCard from "./EquipmentCard";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByDeptIdQuery } from "@/redux/api/equipmentsApi";

const RelatedEquipments = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const { data } = useGetEquipmentsByDeptIdQuery();

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

  const fltrData = data?.data?.filter((d) => d?._id !== id);

  return (
    <div className="relative overflow-hidden py-10">
      <Heading variant="small">
        {t("coreBusiness.browse_more_equipments")}
      </Heading>
      <Heading variant="big">{t("coreBusiness.related_equipments")}</Heading>
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
          {fltrData?.slice(0, 5)?.map((d) => (
            <EquipmentsCard key={d._id} equipment={d} />
          ))}
        </div>

        <HyperLink
          onClick={() => navigate(-1)}
          icon={<LuArrowRight className="rtl:rotate-180" />}
          variant="filled"
          className="mx-auto mt-3"
        >
          {t("coreBusiness.view_all_equipments")}
        </HyperLink>
      </MaxContainer>
    </div>
  );
};

export default RelatedEquipments;

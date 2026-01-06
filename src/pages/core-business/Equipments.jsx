import React from "react";
import { Head, MaxContainer } from "@/components";
import { useGetEquipmentsByDeptIdQuery } from "@/redux/api/equipmentsApi";
import EquipmentCard from "@/components/core-business/EquipmentCard";

const Equipments = () => {
  const { data } = useGetEquipmentsByDeptIdQuery();
  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Equipments | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />

      <MaxContainer className="flex flex-wrap justify-center gap-5 px-5 py-10 sm:px-8">
        {data?.data?.map((d) => (
          <EquipmentCard equipment={d} key={d?._id} />
        ))}
      </MaxContainer>
    </>
  );
};

export default Equipments;

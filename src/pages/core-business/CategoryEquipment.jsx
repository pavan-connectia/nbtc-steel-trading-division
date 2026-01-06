import React from "react";
import { Head, MaxContainer } from "@/components";
import { useGetEquipmentsByCategoryQuery } from "@/redux/api/equipmentsApi";
import { useParams } from "react-router-dom";
import EquipmentCard from "@/components/core-business/EquipmentCard";

const CategoryEquipment = () => {
  const { category } = useParams();

  const { data } = useGetEquipmentsByCategoryQuery(category);
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

export default CategoryEquipment;

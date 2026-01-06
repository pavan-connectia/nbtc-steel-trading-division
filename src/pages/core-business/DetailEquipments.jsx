import React from "react";
import { ContactForm, Head } from "@/components";
import EquimentsDetails from "@/components/core-business/EquimentsDetails";
import { useParams } from "react-router-dom";
import { useGetEquipmentsByIdQuery } from "@/redux/api/equipmentsApi";
import RelatedEquipments from "@/components/core-business/RelatedEquipments";

const DetailEquipments = () => {
  const { id } = useParams();
  const { data } = useGetEquipmentsByIdQuery(id);

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
      <EquimentsDetails data={data?.data} />

      <div className="mt-10 bg-accent px-3 py-10 md:mt-16 lg:mt-20">
        <RelatedEquipments id={id} />
      </div>
      <ContactForm />
    </>
  );
};

export default DetailEquipments;

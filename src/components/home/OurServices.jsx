import React, { useState } from "react";
import { LuPhoneCall } from "react-icons/lu";
import { Button, Heading, HyperLink, QuotationForm } from "../";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByFeaturedPopularDeptIdQuery } from "@/redux/api/equipmentsApi";
import EquipmentCard from "../core-business/EquipmentCard";
import Marquee from "react-fast-marquee";

const OurServices = () => {
  const { t } = useTranslation();
  const { data: equipDept } = useGetEquipmentsByFeaturedPopularDeptIdQuery();
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const fltrdFeatured = equipDept?.data?.filter((e) => e.featured === true);

  return (
    <div className="my-10">
      <div className="bg-blue">
        <div className="mx-auto max-w-[1280px] px-3 py-12 sm:px-8">
          <Heading
            variant="big"
            children="Our Featured Equipments"
            className="uppercase text-white"
          >
            {t("coreBusiness.our_featured_equipments")}
          </Heading>

          <Marquee
            speed={150}
            gradient={false}
            pauseOnHover
            className="mx-auto max-w-[1100px]"
          >
            <div className="scrollbar-hide flex justify-start gap-5 overflow-x-auto px-5 py-10">
              {fltrdFeatured?.map((d) => (
                <EquipmentCard equipment={d} key={d?._id} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      <div className="flex w-full flex-col gap-1 md:flex-row">
        <div className="w-full bg-accent p-8">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <h5 className="font-lato text-sm font-medium text-blue">
              {t("home.free_quote")}
            </h5>
            <Button
              onClick={() => {
                setSelectedEquipment({
                  title: "General Enquiry",
                  department: import.meta.env.VITE_DEPT_ID,
                });
                setShowModal(true);
              }}
              text={t("home.get_a_quote")}
              className="font-kanit bg-red text-sm font-light text-white"
            />
          </div>
        </div>

        <div className="w-full bg-accent p-8">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <h5 className="font-lato text-sm font-medium text-blue">
              {t("home.not_sure_which_sol")}
            </h5>
            <HyperLink
              href="/contact"
              icon={<LuPhoneCall />}
              className={"font-kanit bg-red text-sm font-light text-white"}
            >
              {t("nav.contact_us")}
            </HyperLink>
          </div>
        </div>
      </div>

      <QuotationForm isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default OurServices;

import React, { useState } from "react";
import {  LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Heading } from "../";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByFeaturedPopularDeptIdQuery } from "@/redux/api/equipmentsApi";
import EquipmentCard from "../core-business/EquipmentCard";
import Marquee from "react-fast-marquee";

const OurServices = () => {
  const { t } = useTranslation();
  const { data: equipDept } = useGetEquipmentsByFeaturedPopularDeptIdQuery();
  // const [showModal, setShowModal] = useState(false);
  // const [selectedEquipment, setSelectedEquipment] = useState(null);
  
  // State to control the continuous animation direction
  const [direction, setDirection] = useState("left");

  const fltrdFeatured = equipDept?.data?.filter((e) => e.featured === true);

  return (
    <div className="my-10">
      <div className="bg-blue">
        <div className="mx-auto max-w-[1280px] px-3 py-12 sm:px-8">
          <Heading
            variant="big"
            className="uppercase text-white mb-10"
          >
            {t("coreBusiness.our_featured_equipments")}
          </Heading>

          {/* Marquee Wrapper with Side Buttons */}
          <div className="relative flex items-center group">
            
            {/* Left Control Button */}
            <button 
              onClick={() => setDirection("right")}
              className="absolute left-0 z-30 bg-red p-3 text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100 shadow-xl"
              aria-label="Scroll Right"
            >
              <LuArrowLeft size={24} className="rtl:rotate-180" />
            </button>

            <Marquee
              speed={100}
              gradient={false}
              pauseOnHover
              direction={direction} 
              className="mx-auto"
            >
              <div className="flex gap-5 py-5 ml-5">
                {fltrdFeatured?.map((d) => (
                  <div key={d?._id} className="min-w-[300px]">
                    <EquipmentCard equipment={d} />
                  </div>
                ))}
              </div>
            </Marquee>

            {/* Right Control Button */}
            <button 
              onClick={() => setDirection("left")}
              className="absolute right-0 z-30 bg-red p-3 text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100 shadow-xl"
              aria-label="Scroll Left"
            >
              <LuArrowRight size={24} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Call to Action area */}
      {/* <div className="flex w-full flex-col gap-1 md:flex-row">
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
      </div> */}

      {/* <QuotationForm 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        // passing selectedEquipment if needed by your QuotationForm
        defaultValues={selectedEquipment} 
      /> */}
    </div>
  );
};

export default OurServices;
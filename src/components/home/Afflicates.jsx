import React from "react";
import Marquee from "react-fast-marquee";
import { Heading, Img } from "../";
import { useGetAfflicatesQuery } from "@/redux/api/afflicatesApi";
import { useTranslation } from "react-i18next";

const Afflicates = () => {
  const { t } = useTranslation();
  const { data } = useGetAfflicatesQuery();

  return (
    <div className="space-y-10 bg-accent py-10 md:py-12 lg:py-14">
      <Heading children="Our Affiliates & Subsidiaries" variant="big">
        {t("home.our_associates_affiliates")}
      </Heading>
      <Marquee speed={100} gradient={false} className="mx-auto max-w-[1100px]">
        <div className="flex gap-10 px-5">
          {data?.data?.map((d) => (
            <div
              key={d?._id}
              className="flex h-24 w-48 items-center justify-center bg-white px-7 py-4"
            >
              <Img
                dynamic
                src={d?.image}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Afflicates;

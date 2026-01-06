import React from "react";
import Marquee from "react-fast-marquee";
import { Heading, Img } from "..";
import { useGetClientsQuery } from "@/redux/api/clientsApi";
import { useTranslation } from "react-i18next";

const Client = () => {
  const { t } = useTranslation();
  const { data } = useGetClientsQuery();

  return (
    <div className="space-y-10 bg-accent py-10 md:py-12 lg:py-14">
      <Heading variant="big">{t("home.our_clients")}</Heading>

      <Marquee speed={150} gradient={false} className="mx-auto max-w-[1100px]">
        <div className="flex gap-10 px-5">
          {data?.data.map((d) => (
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

export default Client;

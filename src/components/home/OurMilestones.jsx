import React from "react";
import { motion } from "framer-motion";
import growth from "@/assets/home/growth.webp";
import { Heading, Img, MaxContainer, Paragraph } from "../";
import { useGetMilestonesQuery } from "@/redux/api/milestonesApi";
import { useTranslation } from "react-i18next";

const OurMilestones = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetMilestonesQuery();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Img
        src={growth}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out"
        alt="Milestone Background"
      />
      <div className="absolute z-10 h-full w-full bg-gradient-to-tr from-blue/50 via-blue/55 to-blue/75" />
      <div className="relative z-10 flex h-full flex-col justify-center text-center text-white">
        <Heading variant="big" className={"py-10 text-white"}>
          {t("home.our_milestones")}
        </Heading>
        <div className="scrollbar-hide relative flex flex-col items-center space-y-8 overflow-y-auto">
          <MaxContainer className="relative w-full max-w-[1000px] px-3 pb-20 pt-10">
            <div
              className={`absolute h-full border border-red ${
                currentLang === "ar"
                  ? "right-[3.2rem] sm:right-[50%]"
                  : "left-[3.2rem] sm:left-[50%]"
              }`}
            ></div>

            {data?.data?.map((d, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={d.year}
                  className={`mb-8 flex min-h-[10rem] w-full items-center justify-between text-left ${
                    isEven && "sm:flex-row-reverse"
                  }`}
                >
                  <div className="hidden w-5/12 sm:block"></div>

                  <div className="relative">
                    <div className="z-50 flex h-[3.5rem] w-[5rem] items-center rounded-full bg-red shadow-xl">
                      <h1 className="font-kanit z-30 mx-auto text-[1.4rem] font-semibold text-blue">
                        {d?.year}
                      </h1>
                    </div>
                    <div className="absolute -right-0.5 top-0.5 h-[3.5rem] w-[5rem] rounded-full bg-[#D4DDEE] shadow-xl" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ infinite: true, amount: 0.2 }}
                    className="w-7/12 bg-white text-blue sm:w-5/12"
                  >
                    <Img dynamic src={d?.image} className="w-full" />
                    <h3 className="px-3 py-3 text-xl font-bold">
                      {d?.title?.[currentLang] || ""}
                    </h3>
                    <Paragraph className="px-3 pb-3 text-sm leading-snug tracking-wide">
                      {d?.description[currentLang]}
                    </Paragraph>
                  </motion.div>
                </div>
              );
            })}
          </MaxContainer>
        </div>
      </div>
    </div>
  );
};

export default OurMilestones;

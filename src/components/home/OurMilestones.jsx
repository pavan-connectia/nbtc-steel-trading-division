import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading, Img } from "../";
import { useTranslation } from "react-i18next";
import { useGetMilestonesQuery } from '@/redux/api/milestonesApi';

const AUTO_PLAY_DURATION = 5;

export default function CompanyTimeline() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const { data: response, isLoading } = useGetMilestonesQuery();
  const MILESTONES = response?.data || [];

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);

  const mobileScrollRef = useRef(null);
  const mobileItemRefs = useRef([]);

  useEffect(() => {
    if (MILESTONES.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MILESTONES.length);
    }, AUTO_PLAY_DURATION * 1000);
    return () => clearInterval(timer);
  }, [MILESTONES.length]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const activeItem = mobileItemRefs.current[activeIndex];
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    } else {
      const container = scrollContainerRef.current;
      const activeItem = itemRefs.current[activeIndex];
      if (activeItem && container) {
        const scrollPosition =
          activeItem.offsetTop -
          (container.clientHeight / 2);
        container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [activeIndex, MILESTONES.length]);

  if (isLoading || MILESTONES.length === 0) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  const currentItem = MILESTONES[activeIndex];

  return (
    <div className="bg-white">
      <Heading variant="big" className={"py-10 text-blue px-10"}>
        {t("home.our_milestones")}
      </Heading>

      <div className="block md:hidden bg-white overflow-hidden">

        <div
          ref={mobileScrollRef}
          className="relative flex overflow-x-auto scrollbar-hide pt-10 pb-12" 
        >
          <div className="flex items-center px-[50vw]">
            {MILESTONES.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              const isLast = idx === MILESTONES.length - 1;

              return (
                <div
                  key={item._id}
                  ref={(el) => (mobileItemRefs.current[idx] = el)}
                  className="flex items-center "
                >
                  <div className="flex flex-col items-center relative">
                    <div
                      onClick={() => setActiveIndex(idx)}
                      className="w-3.5 h-3.5 rounded-full cursor-pointer transition-colors duration-500 z-10 relative"
                      style={{
                        backgroundColor: isActive || isPast ? "#ef4444" : "#ef4444"
                      }}
                    />

                    <span
                      className={`absolute top-6 text-sm font-bold transition-all duration-300 min-w-[60px] text-center z-30 ${isActive ? "text-black scale-110" : "text-gray-400"
                        }`}
                    >
                      {item.year}
                    </span>
                  </div>

                  {!isLast && (
                    <div className="w-20 h-[4px] bg-gray-200">
                      {isActive && (
                        <motion.div
                          key={`line-${activeIndex}`}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTO_PLAY_DURATION, ease: "linear" }}
                          className="h-full bg-[#ef4444]"
                        />
                      )}
                      {isPast && <div className="h-full w-full bg-gray-200" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[220px]"
            >
              <h3 className="text-[#ef4444] text-lg font-bold mb-4">
                {currentItem.title[currentLang]}
              </h3>

              <div
                className=" space-y-3 mb-8
    leading-relaxed 
    text-sm md:text-base 
    max-w-sm
    [&>ul]:list-disc
    [&>ul]:pl-5
    [&>ul]:space-y-2
    [&>ol]:list-decimal
    [&>ol]:pl-5
    [&>ol]:space-y-2
    [&>p]:mb-3"
                dangerouslySetInnerHTML={{
                  __html: currentItem.description[currentLang]
                }}
              />

              <div className="w-full rounded-lg overflow-hidden shadow-md h-[480px] mb-12">
                <Img
                  key={`mobile-img-${activeIndex}`}
                  dynamic
                  src={currentItem?.image}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden md:flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <Img
              key={activeIndex}
              dynamic
              src={MILESTONES[activeIndex]?.image}
              className="w-auto h-full object-cover rounded-sm shadow-xl"
            />
          </AnimatePresence>
        </div>

        <div
          ref={scrollContainerRef}
          className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto scrollbar-hide bg-white isometric-bg"
 
        >
          <div className="pointer-events-none sticky top-0 h-24 w-full bg-gradient-to-b from-white to-transparent z-10" />
           <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-80" />
          <div className="max-w-lg  relative " >
            {MILESTONES.map((item, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              return (
                <div
                  key={item._id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className="relative flex cursor-pointer group"
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={`absolute ${currentLang === 'ar' ? 'right-1.5' : 'left-1.5'} top-0 h-full flex flex-col items-center w-4`}>
                    <motion.div
                      animate={{ backgroundColor: "#ef4444" }}
                      className="z-10 w-4 h-4 rounded-full  border-white shadow-sm flex-shrink-0"
                    />
                    <div className="w-[4px] flex-grow relative bg-gray-100">
                      {isActive && (
                        <motion.div
                          key={activeIndex}
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ duration: AUTO_PLAY_DURATION, ease: "linear" }}
                          className="absolute top-0 w-full bg-[#ef4444]"
                        />
                      )}
                      {isPast && <div className="absolute inset-0 w-full h-full bg-gray-100" />}
                    </div>
                  </div>
                  <div className={`${currentLang === 'ar' ? 'pr-16 text-right' : 'pl-16 text-left'} pb-16`}>
                    <motion.h2 className="text-2xl font-bold text-black transition-all origin-left leading-none">
                      {item.year}
                    </motion.h2>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: currentLang === 'ar' ? -10 : 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: currentLang === 'ar' ? 10 : -10 }}
                          className="mt-6"
                        >
                          <h3 className="text-[#ef4444] font-semibold text-lg mb-2">{item.title[currentLang]}</h3>
                          <div
                            className="
                                      leading-relaxed 
                                      text-sm md:text-base 
                                      max-w-lg
                                      [&>ul]:list-disc
                                      [&>ul]:pl-5
                                      [&>ul]:space-y-2
                                      [&>ol]:list-decimal
                                      [&>ol]:pl-5
                                      [&>ol]:space-y-2
                                      [&>p]:mb-1"
                            dangerouslySetInnerHTML={{
                              __html: item.description[currentLang]
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
     
        </div>
      </div>
    </div>
  );
}
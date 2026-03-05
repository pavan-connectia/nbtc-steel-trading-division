import React, { useEffect, useState } from "react";
import { useGetHomeByDeptIdQuery } from "@/redux/api/homeApi";
import { StatisticsCard } from "..";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HomeStatistics = () => {
  const { data } = useGetHomeByDeptIdQuery();
  const statistics = data?.data?.statistics || [];

  const [slidesPerView, setSlidesPerView] = useState(2);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;

      if (width >= 1440) setSlidesPerView(7);
      else if (width >= 1024) setSlidesPerView(5);
      else if (width >= 640) setSlidesPerView(3);
      else setSlidesPerView(2);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);

    return () => window.removeEventListener("resize", updateSlides);
  }, []);


  return (
   <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={2}
      centerInsufficientSlides={true}
      grabCursor={true}
      allowTouchMove={true}
      watchOverflow={true}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
        1440: { slidesPerView: 7 },
      }}
      loop={statistics.length > slidesPerView}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="w-full"
    >
      {statistics.map((s, idx) => (
        <SwiperSlide key={idx}>
          <StatisticsCard statistic={s} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeStatistics;
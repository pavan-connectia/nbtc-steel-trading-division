import React from "react";
import { useGetHomeByDeptIdQuery } from "@/redux/api/homeApi";
import { StatisticsCard } from "..";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HomeStatistics = () => {
  const { data } = useGetHomeByDeptIdQuery();
  const statistics = data?.data?.statistics || [];

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
      loop={statistics.length > 7}
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
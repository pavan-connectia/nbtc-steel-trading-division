import React, { useRef, useState, useEffect } from "react";
import { Button, Heading, HyperLink, MaxContainer } from "..";
import EquipmentsCard from "./EquipmentCard";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByDeptIdQuery } from "@/redux/api/equipmentsApi";

const RelatedEquipments = ({ id }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const { data } = useGetEquipmentsByDeptIdQuery();
  const [items, setItems] = useState([]);
  const [scrollInterval, setScrollInterval] = useState(null);

  useEffect(() => {
    if (data?.data) {
      const filtered = data.data.filter((d) => d?._id !== id);
      setItems(filtered);
    }
  }, [data, id]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || items.length === 0) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    if (scrollLeft + clientWidth >= scrollWidth - 10) {

      setItems(prev => [...prev, ...prev.slice(0, 5)]);
    }

    if (scrollLeft <= 10) {

      const newItems = [...items.slice(-5), ...items];
      setItems(newItems);
      setTimeout(() => {
        if (container) {
          const firstSetWidth = container.children[5]?.offsetLeft || 0;
          container.scrollLeft = firstSetWidth;
        }
      }, 0);
    }
  };

  const startAutoScroll = (direction) => {
    stopAutoScroll();
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const scrollAmount = direction === 'left' ? -5 : 5;
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }, 20);
    setScrollInterval(interval);
  };

  const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const newScrollLeft = container.scrollLeft - 400;
      
      if (newScrollLeft < 200) {
        setItems(prev => [...prev.slice(-5), ...prev]);
        setTimeout(() => {
          if (container) {
            const middleIndex = Math.floor(container.children.length / 2);
            const middleElement = container.children[middleIndex];
            if (middleElement) {
              container.scrollLeft = middleElement.offsetLeft - 200;
            }
          }
        }, 0);
      } else {
        container.scrollBy({
          left: -400,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, clientWidth, scrollWidth } = container;

      if (scrollLeft + clientWidth + 400 > scrollWidth - 200) {
        setItems(prev => [...prev, ...prev.slice(0, 5)]);
        setTimeout(() => {
          if (container) {
            container.scrollBy({
              left: 400,
              behavior: "smooth",
            });
          }
        }, 0);
      } else {
        container.scrollBy({
          left: 400,
          behavior: "smooth",
        });
      }
    }
  };

  const handleMouseDown = (direction) => {
    startAutoScroll(direction);
  };

  const handleMouseUp = () => {
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    stopAutoScroll();
  };

  return (
    <div className="relative overflow-hidden py-10">
      <Heading variant="small">
        {t("coreBusiness.browse_more_equipments")}
      </Heading>
      <Heading variant="big">{t("coreBusiness.related_equipments")}</Heading>
      <MaxContainer className="relative">
        {/* Left Scroll Button */}
        <Button
          icon={<LuArrowLeft size={20} />}
          onClick={handleScrollLeft}
          onMouseDown={() => handleMouseDown('left')}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 top-1/2 z-10 mx-5 hidden h-fit -translate-y-1/2 transform rounded-lg bg-blue px-2 text-white transition-all hover:bg-blue/80 active:scale-95 lg:block"
          aria-label="scroll left"
        />
        
        {/* Right Scroll Button */}
        <Button
          icon={<LuArrowRight size={20} />}
          onClick={handleScrollRight}
          onMouseDown={() => handleMouseDown('right')}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="absolute right-0 top-1/2 z-10 mx-5 hidden h-fit -translate-y-1/2 transform rounded-lg bg-blue px-2 text-white transition-all hover:bg-blue/80 active:scale-95 lg:block"
          aria-label="scroll right"
        />

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex max-w-[1100px] justify-start gap-5 overflow-x-auto py-8 transition-all lg:mx-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          {items.map((d, index) => (
            <EquipmentsCard 
              key={`${d._id}-${index}`} 
              equipment={d} 
            />
          ))}
        </div>

        {/* View All Link */}
        <HyperLink
          onClick={() => navigate(-1)}
          icon={<LuArrowRight className="rtl:rotate-180" />}
          variant="filled"
          className="mx-auto mt-3"
        >
          {t("coreBusiness.view_all_equipments")}
        </HyperLink>
      </MaxContainer>
    </div>
  );
};

export default RelatedEquipments;
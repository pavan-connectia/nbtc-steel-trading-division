import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const StatisticsCard = ({ statistic }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const [animatedNumber, setAnimatedNumber] = useState(0);
  const duration = 3000;

  const rawValue = statistic?.number || "";

  const numberMatch = rawValue.match(/\d+(\.\d+)?/);

  const suffix = rawValue.replace(numberMatch ? numberMatch[0] : "", "");

  const totalNumber = numberMatch ? parseFloat(numberMatch[0]) : 0;

  useEffect(() => {
    if (totalNumber <= 0) {
      setAnimatedNumber(0);
      return;
    }

    let startTime;
    let animationFrameId;

    const animateNumber = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const decimalPlaces = numberMatch?.[0]?.includes(".") ? 1 : 0;

      setAnimatedNumber(
        Number((easeOut * totalNumber).toFixed(decimalPlaces))
      );


      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [totalNumber]);

  return (
    <div className="min-w-[200px] border-l-[4px] border-red bg-white p-5 text-blue">
      <h4 className="font-kanit mb-1 text-3xl font-semibold">
        {animatedNumber}
        <span
          className={`ml-1 ${suffix === "+"
              ? "font-kanit text-3xl font-semibold"
              : "text-lg font-medium text-gray-500"
            }`}
        >
          {suffix}
        </span>
      </h4>

      <p className="font-lato text-sm font-medium">
        {statistic?.text[currentLang]}
      </p>
    </div>
  );
};

export default StatisticsCard;

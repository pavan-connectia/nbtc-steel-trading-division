import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const StatisticsCard = ({ statistic }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const [animatedNumber, setAnimatedNumber] = useState(0);
  const duration = 5000;

  const totalNumber = parseInt(statistic?.number.replace("+", ""), 10) || 0;

  useEffect(() => {
    if (totalNumber <= 0) return;
    let startTime;

    const animateNumber = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);
      setAnimatedNumber(Math.floor(progress * totalNumber));

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [totalNumber]);

  return (
    <div className="min-w-[200px] border-l-[4px] border-red bg-white p-5 text-blue">
      <h4 className="font-kanit mb-1 text-3xl font-semibold">
        {animatedNumber}
        {statistic?.number.includes("+") ? "+" : "%"}
      </h4>
      <p className="font-lato text-sm font-medium">
        {statistic?.text[currentLang]}
      </p>
    </div>
  );
};

export default StatisticsCard;

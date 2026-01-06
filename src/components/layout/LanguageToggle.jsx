import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDirection, setLanguage } from "@/redux/slice/layoutDirectionSlice";
import { useTranslation } from "react-i18next";
import { LuGlobe } from "react-icons/lu";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const direction = useSelector((state) => state.layoutDirection.direction);

  const handleToggle = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    const newDirection = direction === "ltr" ? "rtl" : "ltr";

    i18n.changeLanguage(newLanguage);
    dispatch(setDirection(newDirection));
    dispatch(setLanguage(newLanguage));
  };

  return (
    <button
      onClick={handleToggle}
      className="font-kanit flex items-center gap-1 text-white"
    >
      <LuGlobe /> <span>{direction === "ltr" ? "عربي" : "English"}</span>
    </button>
  );
}

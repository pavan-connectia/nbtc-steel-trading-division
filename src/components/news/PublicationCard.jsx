import React from "react";
import {LuCalendarDays } from "react-icons/lu";
import { Heading,  Img , Button} from "..";
import { useTranslation } from "react-i18next";

const PublicationCard = ({ publication }) => {
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language === "ar" ? "ar" : "en";

    return (
        <div className="min-w-[22.5rem] max-w-[22.5rem] bg-white p-3">
            <Img
                dynamic
                src={publication?.image}
                className="max-h-[223px] w-full object-cover"
            />
            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1 text-blue">
                        <LuCalendarDays />
                        <p className="font-kanit text-xs font-light">{publication?.date}</p>
                    </div>

                </div>
                <Heading
                    className="line-clamp-1 text-left text-base font-medium text-blue rtl:text-right"
                    variant="small"
                    children={publication?.title}
                />

                {publication?.pdf && (
                    <Button
                        onClick={() =>
                            window.open(
                                import.meta.env.VITE_API_BASE_URL + publication?.pdf,
                                "_blank",
                            )
                        }
                        text={t("coreBusiness.download_pdf")}
                        variant="secondary"
                        className="!my-5 w-full"
                    />
                )}
            </div>
        </div>
    );
};

export default PublicationCard;

import React from "react";
import {
  LuFacebook,
  LuInstagram,
  LuYoutube,
  LuLinkedin,
  LuMail,
  LuPhoneCall,
  LuMapPin,
} from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetHomeByDeptIdQuery } from "@/redux/api/homeApi";
import { Heading, Img } from "..";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { data } = useGetHomeByDeptIdQuery();
  const homeData = data?.data || {};
  const currentLang = i18n.language === "ar" ? "ar" : "en";
  const socialLinks = [
    {
      name: "facebook profile",
      href: homeData.facebookLink || "",
      icon: <LuFacebook size={30} className="rounded-md p-1" />,
    },
    {
      name: "youtube profile",
      href: homeData.youtubeLink || "",
      icon: <LuYoutube size={30} className="rounded-md p-1" />,
    },
    {
      name: "twitter profile",
      href: homeData.twitterLink || "",
      icon: <FaXTwitter size={30} className="rounded-md p-1" />,
    },
    {
      name: "instagram profile",
      href: homeData.instagramLink || "",
      icon: <LuInstagram size={30} className="rounded-md p-1" />,
    },
    {
      name: "linkedin profile",
      href: homeData.linkedInLink || "",
      icon: <LuLinkedin size={30} className="rounded-md p-1" />,
    },
  ];

  const quickLinks = [
    {
      title: t("nav.news.submenu.photoGallery"),
      href: "/news/photo-gallery",
    },

    {
      title: t("nav.news.submenu.csr"),
      href: "/news/csr",
    },
    {
      title: t("nav.careers"),
      href: "/careers",
    },
  ];

  return (
    <footer className="bg-blue">
      <div className="mx-auto max-w-[1250px] p-5 md:p-8">
        <div className="flex flex-wrap justify-between gap-x-5 gap-y-10">
          <div className="space-y-5">
            <Link to={"/"} aria-label="goto home">
              <Img
                className="h-auto w-[250px] object-contain"
                src="/logo-footer.png"
                aria-label="logo"
              />
            </Link>
            <div className="flex items-center justify-around">
              {socialLinks?.map((social) => (
                <Link
                  aria-label={social?.name}
                  to={social.href}
                  key={social.name}
                  target="_blank"
                >
                  <span className="text-white">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-kanit text-lg font-medium text-textGray">
              {t("footer.quick_links")}
            </h4>

            <div className="flex flex-col gap-y-3">
              {quickLinks.map((link) => (
                <Link
                  name={link?.title}
                  to={link?.href}
                  key={link?.title}
                  className="font-lato text-sm font-normal text-textGray"
                >
                  {link?.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-x-3">
              <div className="p-1">
                <LuMapPin className="text-white" size={18} />
              </div>

              <div className="space-y-2">
                <h4 className="font-kanit text-lg font-medium text-textGray">
                  {t("footer.corporate_office_address")}
                </h4>
                <div className="flex flex-col gap-y-3 text-wrap">
                  {homeData?.companyAddress?.map((link) => (
                    <Link
                      name={link?.name}
                      to={link?.href}
                      key={link?._id}
                      className="font-lato max-w-xs break-words text-sm font-normal text-textGray"
                    >
                      {link?.title[currentLang]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-x-3">
              <div className="p-1">
                <LuPhoneCall className="text-white" size={18} />
              </div>

              <div className="flex flex-col gap-y-3">
                {homeData?.companyPhones?.map((link) => (
                  <Link
                    name={link?.name}
                    to={link?.href}
                    key={link?._id}
                    className="font-lato text-sm font-normal text-textGray"
                  >
                    {link?.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-x-3">
              <div className="p-1">
                <LuMail className="text-white" size={18} />
              </div>

              <div className="flex flex-col gap-y-3">
                {homeData?.companyEmail?.map((link) => (
                  <Link
                    name={link?.name}
                    to={link?.href}
                    key={link?._id}
                    className="font-lato text-sm font-normal text-textGray"
                  >
                    {link?.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-200 py-5">
        <h3 className="font-kanit text-center text-textGray">
          {t("footer.all_rights")}
        </h3>
      </div>
    </footer>
  );
}

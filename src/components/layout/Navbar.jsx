import React, { useRef, useState, useEffect } from "react";
import { LuChevronDown, LuMenu, LuPhoneCall } from "react-icons/lu";
import { Link, NavLink, useLocation } from "react-router-dom";
import useClickOutside from "@/hooks/useClickOutside";
import HyperLink from "../ui/HyperLink";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef(null);
  const sideBarRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMobileSubmenu = (idx) =>
    activeMobileMenu === idx
      ? setActiveMobileMenu(null)
      : setActiveMobileMenu(idx);

  useClickOutside(menuRef, () => setActiveMenu(null));
  useClickOutside(sideBarRef, () => setMenuOpen(false));

  const nav = [
    {
      title: t("nav.home"),
      href: "/",
    },
    {
      title: t("nav.about.title"),
      submenu: [
        {
          title: t("nav.about.submenu.corporateProfile"),
          href: "/about",
        },
        {
          title: t("about.visionMissionValues"),
          href: "/about/vision-mission-values",
        },
        {
          title: t("nav.about.submenu.chairmanMsg"),
          href: "/about/chairman-msg",
        },
        {
          title: t("nav.about.submenu.mdMsg"),
          href: "/about/md-msg",
        },
        {
          title: t("nav.about.submenu.executiveManagement"),
          href: "/about/executive-management",
        },
        // {
        //   title: t("nav.about.submenu.qualifications"),
        //   href: "/about/qualifications",
        // },
        {
          title: t("nav.about.submenu.subsidiaries"),
          href: "/about/subsidiary",
        },
      ],
    },
    {
      title: t("nav.productsServices.title"),
      href: "/products-service",
    },
    {
      title: t("nav.qhse.title"),
      href: "/qhse",
    },
    {
      title: t("nav.projects.title"),
      href: `/projects`,
    },
    {
      title: t("nav.news.title"),
      submenu: [
        {
          title: t("nav.news.submenu.newsEvents"),
          href: "/news",
        },
        {
          title: t("nav.news.submenu.csr"),
          href: "/news/csr",
        },
        {
          title: t("nav.news.submenu.photoGallery"),
          href: "/news/photo-gallery",
        },
        {
          title: t("nav.news.submenu.videoGallery"),
          href: "/news/video-gallery",
        },
        {
          title: t("nav.news.submenu.publication"),
          href: "/news/publication",
        },
      ],
    },
    // {
    //   title: t("nav.careers"),
    //   href: "/careers",
    // },
  ];

   const handleScroll = () => {
  const currentScrollY = window.scrollY;

  setIsSticky(currentScrollY > 200);

  if (currentScrollY > lastScrollY.current) {
    setIsVisible(false);
  } else {
    setIsVisible(true);
  }

  if (currentScrollY < 50) {
    setIsVisible(true);
  }

  lastScrollY.current = currentScrollY;
};

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isTransparent =
    location.pathname === "/" || location.pathname === "/products-service";

  return (
      <header
      className={`z-100 w-full p-3 lg:p-5 ${!isTransparent ? "bg-blue/90" : "absolute top-0 bg-transparent"
        }`}
    >
      <div
        className={`transition-transform duration-300 ${isSticky
            ? `fixed left-0 top-0 z-40 w-full bg-blue/90 shadow-lg ${isVisible ? "translate-y-0" : "-translate-y-full"
            }`
            : ""
          }`}
      >
        <div
          className={`mx-auto max-w-[1280px] ${isSticky ? "p-1" : ""}`}
        >
          {/* Top row with logo and langugage button */}
          <div className="flex items-center justify-between ">
            <Link to="/" aria-label="logo" className="shrink-0 z-50">
              <img src="/logo.png" alt="Logo" className="w-[200px] object-contain" />
            </Link>


            <div className="relative hidden items-center justify-between rounded-md bg-transparent px-3 py-1.5 text-textGray lg:flex">
              <LanguageToggle />
            </div>


            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden z-50">
              <LuMenu size={20} className="text-white" />
            </button>
          </div>

          {/* Desktop Navigation - Only show when not sticky */}
          {!isSticky && (
            <DesktopMenu
              nav={nav}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          )}
        </div>

        {/* Sticky Navigation - Show when sticky */}
        {isSticky && (
          <div className="mx-auto max-w-[1280px] p-1">
            <DesktopMenu
              nav={nav}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      <nav
        className={`fixed top-0 z-[100] h-screen overflow-y-auto py-5 duration-700 lg:hidden ${menuOpen ? "right-0" : "-right-full"
          } w-full max-w-[300px] bg-black`}
        ref={sideBarRef}
      >
        <div className="flex flex-col gap-5 py-5 text-sm">
          {nav.map((navItem, idx) => (
            <div key={idx} className="font-kanit relative">
              {!navItem.submenu ? (
                <NavLink
                  to={navItem.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center py-2 pl-10 text-textGray"
                >
                  {navItem.title}
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() =>
                      activeMobileMenu === idx
                        ? setActiveMobileMenu(null)
                        : setActiveMobileMenu(idx)
                    }
                    className="flex w-full items-center py-2 pl-10 text-textGray"
                  >
                    {navItem.title}
                    <LuChevronDown className={`ml-1.5 transition-transform ${activeMobileMenu === idx ? "rotate-180" : ""}`} />
                  </button>

                  {activeMobileMenu === idx && (
                    <div className="absolute left-0 top-full z-[110] mt-2 w-full rounded-lg bg-black text-textGray shadow-lg">
                      {navItem.submenu.map((sub, subIdx) => {
                        const isCore = navItem.title === t("nav.coreBusiness.title");

                        return isCore ? (
                          subIdx < 5 ? (
                            <NavLink
                              key={subIdx}
                              to={sub.href}
                              onClick={() => setMenuOpen(false)}
                              className="block py-3 pl-12 hover:bg-gray-800"
                            >
                              {sub.title}
                            </NavLink>
                          ) : (
                            <a
                              key={subIdx}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block py-3 pl-12 hover:bg-gray-800"
                            >
                              {sub.title}
                            </a>
                          )
                        ) : (
                          <NavLink
                            key={subIdx}
                            to={sub.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-3 pl-12 hover:bg-gray-800"
                          >
                            {sub.title}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="ml-8 flex w-fit items-center gap-x-3 rounded border border-red px-3 py-1 text-red"
          >
            <span>{t("nav.contact_us")}</span>
            <LuPhoneCall />
          </Link>

          <div className="ml-8 mt-3">
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

function DesktopMenu({ nav, activeMenu, setActiveMenu, isTransparent }) {
  const { t } = useTranslation();
  return (
    <nav className="font-kanit hidden w-full items-center gap-1 px-3 lg:flex">
      <div className="flex w-full items-center justify-between">
        {nav.map((nav, idx) => (
          <div
            key={idx}
            className="relative z-50"
            onMouseEnter={() => setActiveMenu(idx)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {!nav.submenu ? (
              <NavLink
                to={nav?.href}
                className="flex items-center text-[0.9rem] text-textGray"
              >
                {nav?.title}
              </NavLink>
            ) : (
              <button
                onClick={() => nav.submenu && toggleSubmenu(idx)}
                className="flex items-center text-[0.9rem] text-textGray"
              >
                {nav?.title}

                <LuChevronDown
                  strokeWidth={2.5}
                  className={`${activeMenu === idx && "rotate-180"
                    } ml-1.5 transform transition-transform rtl:mr-1.5`}
                />
              </button>
            )}
            {nav.submenu && activeMenu === idx && (
              <div className="absolute left-0 top-full w-[20rem] overflow-hidden pt-4 rtl:right-0">
                <div className="rounded-lg bg-white shadow-sm">
                  {nav.submenu.map((subnav, subIdx) => (
                    <NavLink
                      key={subIdx}
                      to={subnav?.href}
                      className="block border-b border-gray-300 px-5 py-2.5 text-[0.9rem] text-blue hover:border-l-[4px] hover:border-l-red rtl:hover:border-l-0 rtl:hover:border-r-[4px] rtl:hover:border-r-red"
                    >
                      {subnav?.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <HyperLink
          href="/contact"
          name="contact us"
          className="border-[#F2F3F5] bg-[#F2F3F5]/[0.12] text-sm text-[#F2F3F5]"
          children={t("nav.contact_us")}
          variant="outline"
          icon={<LuPhoneCall />}
        />
      </div>
    </nav>
  );
}

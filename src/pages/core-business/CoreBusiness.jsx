import React, { useState } from "react";
import {
  Button,
  ContactForm,
  Head,
  Heading,
  Hero,
  HyperLink,
  Img,
  MaxContainer,
  Paragraph,
  QuotationForm,
  SetInnerHtml,
} from "@/components";
import { LuArrowRight, LuPhoneCall } from "react-icons/lu";
import HowItWorks from "@/components/core-business/HowItWorks";
import EquipmentCard from "@/components/core-business/EquipmentCard";
import { useGetCoreBusinessByDeptIdQuery } from "@/redux/api/coreBusinessApi";
import { useTranslation } from "react-i18next";
import { useGetEquipmentsByFeaturedPopularDeptIdQuery } from "@/redux/api/equipmentsApi";
import HomeStatistics from "@/components/home/HomeStatistics";

const CoreBusiness = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetCoreBusinessByDeptIdQuery();
  const { data: equipDept } = useGetEquipmentsByFeaturedPopularDeptIdQuery();

    const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const fltrdFeatured = equipDept?.data?.filter((e) => e.featured === true);

  const fltrdPopular = equipDept?.data?.filter((e) => e.popular === true);

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Product Service | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero
        dynamic
        src={data?.data?.banner}
        containerClass={"h-[43rem] overflow-visible"}
      >
        <MaxContainer>
          <div className="absolute top-[33%] z-10 max-w-4xl space-y-10 px-5 text-left md:px-8">
            <div className="font-kanit mb-4 text-2xl font-medium text-white sm:text-3xl md:text-4xl lg:text-[4rem]">
              <Heading
                variant="big"
                className="text-left text-xl font-medium leading-none text-white sm:text-2xl md:text-3xl lg:text-[2.5rem] rtl:text-right"
              >
                {data?.data?.name[currentLang]}
              </Heading>
            </div>

            <SetInnerHtml
              className="font-lato mb-6 text-sm text-textGray sm:text-base rtl:text-right"
              text={data?.data?.description[currentLang]}
            />

            <HyperLink
              href={data?.data?.learnMore}
              className={"bg-red text-white"}
              icon={<LuArrowRight className="rtl:rotate-180" />}
            >
              {t("home.learn_more")}
            </HyperLink>
          </div>
          <div className="scrollbar-hide absolute top-[40rem] z-40 mx-auto flex w-full max-w-[1280px] justify-between gap-5 overflow-x-auto px-10">
            <HomeStatistics />
          </div>
        </MaxContainer>
      </Hero>

      <MaxContainer>
        <div className="py-24 sm:py-28 md:py-32">
          <Heading
            variant="small"
            children="Find you the right equipment"
            className="uppercase"
          >
            {t("coreBusiness.find_you_the_right_equipment")}
          </Heading>
          <Heading
            variant="big"
            children="Our Featured Equipments"
            className="uppercase"
          >
            {t("coreBusiness.our_featured_equipments")}
          </Heading>

          <div className="scrollbar-hide flex justify-start gap-5 overflow-x-auto px-5 py-10">
            {fltrdFeatured?.map((d) => (
              <EquipmentCard equipment={d} key={d?._id} />
            ))}
          </div>

          <HyperLink
            variant="filled"
            className="mx-auto"
            href={`/products-service/equipments`}
            icon={<LuArrowRight className="rtl:rotate-180" />}
          >
            {t("home.view_more")}
          </HyperLink>
        </div>
      </MaxContainer>

      <MaxContainer className="mb-20 flex h-[7rem]">
        <div className="relative w-full md:w-[75%]">
          <div className="absolute z-40 flex h-full w-full items-center justify-between gap-5 p-5 md:px-10">
            <Paragraph
              children="We help you get the most out of your heavy equipment."
              className="font-normal text-white md:text-lg lg:text-xl"
            />
            <Button
              variant="filled"
              className="bg-white text-red"
              text={t("home.get_a_quote")}
              onClick={() => setShowModal(true)}
            />
          </div>
          <Img
            dynamic
            src={data?.data[0]?.howItWorksBanner}
            className="h-full w-full overflow-hidden bg-white object-cover"
          />
          <div className="absolute top-0 h-full w-full bg-blue opacity-90" />
        </div>
        <div className="flex items-center justify-center bg-accent p-5 md:w-[25%]">
          <HyperLink
            href="/contact"
            variant="filled"
            children={"Contact Us"}
            icon={<LuPhoneCall />}
          >
            {t("nav.contact_us")}
          </HyperLink>
        </div>
      </MaxContainer>

      <QuotationForm
        department={data?.data[0]?._id}
        onClose={() => setShowModal(false)}
        isOpen={showModal}
        title="General Enquiry"
      />

      <HowItWorks image={data?.data[0]?.howItWorksBanner} />

      <MaxContainer>
        <div className="pb-10 pt-20">
          <Heading
            variant="small"
            children="Best Selling"
            className="uppercase"
          >
            {t("coreBusiness.best_selling")}
          </Heading>

          <Heading variant="big" className="uppercase">
            {t("coreBusiness.most_popular_equipments")}
          </Heading>

          <div className="scrollbar-hide flex justify-start gap-5 overflow-x-auto px-5 py-10">
            {fltrdPopular?.map((d) => (
              <EquipmentCard equipment={d} key={d?._id} />
            ))}
          </div>

          <HyperLink
            variant="filled"
            className="mx-auto"
            icon={<LuArrowRight className="rtl:rotate-180" />}
            href={`/products-service/equipments`}
          >
            {t("coreBusiness.view_all_equipments")}
          </HyperLink>
        </div>
      </MaxContainer>

      <ContactForm />
    </>
  );
};

export default CoreBusiness;

import React, { useState, useEffect } from "react";
import {
  Button,
  ContactForm,
  Heading,
  Hero,
  Paragraph,
  Head,
} from "@/components";
import contactImg from "@/assets/hero/contact.webp";
import { LuMapPin, LuPhoneCall, LuMail, LuGlobe } from "react-icons/lu";
import { SlEnvolopeLetter } from "react-icons/sl";
import { useGetContactInfoQuery } from "@/redux/api/contactApi";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const { data } = useGetContactInfoQuery();
  const contactData = data?.data || [];
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (contactData.length > 0) {
      setSelectedOption(0);
    }
  }, [contactData]);

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Contact | NBTC"}
        description={data?.data?.seo?.metaDescription}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={contactImg} heading={t("nav.contact_us")} />

      <Heading variant="big" className={"pb-6 pt-10"}>
        {t("contact.contact_address")}
      </Heading>

      <div className="px- mx-auto mb-10 w-fit bg-white sm:px-20">
        <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-3 bg-white py-6 sm:py-10">
          {contactData.map((o, idx) => (
            <Button
              key={o?._id}
              onClick={() => setSelectedOption(idx)}
              variant={`${
                selectedOption === idx ? "primary" : "primaryOutline"
              }`}
              className="uppercase"
              text={o?.title}
            />
          ))}
        </div>

        {selectedOption !== null && (
          <div className="flex w-full flex-wrap justify-between gap-5 px-4 py-16 md:gap-8 lg:gap-10">
            <div className="w-52 space-y-4">
              <LuMapPin className="text-blue" size={35} />
              {contactData[selectedOption]?.postalAddress && (
                <div>
                  <Heading
                    Tag="p"
                    className="text-left uppercase text-blue rtl:text-right"
                    variant={"small"}
                  >
                    {t("contact.postal_address")}
                  </Heading>
                  <Paragraph>
                    {contactData[selectedOption]?.postalAddress}
                  </Paragraph>
                </div>
              )}

              {contactData[selectedOption]?.physcialAddress && (
                <div>
                  <Heading
                    Tag="p"
                    className="text-left uppercase text-blue rtl:text-right"
                    variant={"small"}
                  >
                    {t("contact.physical_address")}
                  </Heading>
                  <Paragraph>
                    {contactData[selectedOption]?.physcialAddress}
                  </Paragraph>
                </div>
              )}
            </div>

            {contactData[selectedOption]?.phone.length > 0 && (
              <div className="space-y-4">
                <LuPhoneCall className="text-blue" size={35} />
                <div>
                  <Heading
                    Tag="p"
                    className="text-left uppercase text-blue rtl:text-right"
                    variant={"small"}
                  >
                    {t("contact.phone")}
                  </Heading>
                  <Paragraph className="ltr">
                    {contactData[selectedOption]?.phone}
                  </Paragraph>
                </div>
              </div>
            )}
            {contactData[selectedOption]?.fax && (
              <div className="space-y-4">
                <SlEnvolopeLetter className="text-blue" size={35} />
                <div>
                  <Heading
                    Tag="p"
                    className="text-left uppercase text-blue rtl:text-right"
                    variant={"small"}
                  >
                    {t("contact.fax")}
                  </Heading>
                  <Paragraph children={contactData[selectedOption]?.fax} />
                </div>
              </div>
            )}

            <div className="space-y-4">
              {contactData[selectedOption]?.email && (
                <div className="space-y-4">
                  <LuMail className="text-center text-blue" size={35} />
                  <div>
                    <Heading
                      Tag="p"
                      className="text-left uppercase text-blue rtl:text-right"
                      variant={"small"}
                    >
                      {t("contact.email")}
                    </Heading>
                    <Paragraph children={contactData[selectedOption]?.email} />
                  </div>
                </div>
              )}

              {contactData[selectedOption]?.website && (
                <div className="space-y-4">
                  <LuGlobe className="text-blue" size={35} />
                  <div>
                    <Heading
                      Tag="p"
                      className="text-left uppercase text-blue rtl:text-right"
                      variant={"small"}
                    >
                      {t("contact.website")}
                    </Heading>
                    <Paragraph
                      children={contactData[selectedOption]?.website}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ContactForm />
    </>
  );
};

export default Contact;

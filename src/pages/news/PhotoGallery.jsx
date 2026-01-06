import React, { useState } from "react";
import {
  Card,
  Head,
  Heading,
  Hero,
  Img,
  MaxContainer,
  Modal,
} from "@/components";
import camera from "@/assets/hero/camera.webp";
import { useTranslation } from "react-i18next";
import { useGetImgGalleryByDeptIdQuery } from "@/redux/api/newsApi";

const PhotoGallery = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetImgGalleryByDeptIdQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Photo Gallery | NBTC"}
        description={data?.data?.seo?.metaDescription || ""}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <Hero src={camera} heading={t("nav.news.submenu.photoGallery")} />
      <MaxContainer className="px-5 py-10 md:gap-8 md:py-16">
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-5">
          {data?.data?.map((d) => (
            <Card
              key={d?.id}
              className="h-[280px] w-[350px] cursor-pointer overflow-hidden"
              onClick={() => {
                setSelectedImage(d);
                setIsModalOpen(true);
              }}
            >
              <Img
                dynamic
                src={d?.image}
                className="h-[210px] w-full object-cover"
              />
              <Heading className="line-clamp-2 overflow-hidden px-1 pt-2 text-blue">
                {d?.title[currentLang]}
              </Heading>
            </Card>
          ))}
        </div>
      </MaxContainer>

      {isModalOpen && selectedImage && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex h-full w-full flex-col items-center justify-center p-4">
            <Img
              dynamic
              src={selectedImage.image}
              className="max-h-[90vh] max-w-full object-contain"
            />
            <Heading className="overflow-hidden px-1 pt-2 text-white">
              {selectedImage.title[currentLang]}
            </Heading>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PhotoGallery;

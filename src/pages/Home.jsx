import React, { lazy, Suspense } from "react";
import useInView from "@/hooks/useInView";
import { Head } from "@/components";
import { useGetHomeByDeptIdQuery } from "@/redux/api/homeApi";

// Lazy-loaded components
const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const Introduction = lazy(() => import("@/components/home/Introduction"));
const OurServices = lazy(() => import("@/components/home/OurServices"));
const HomeProjects = lazy(() => import("@/components/home/HomeProjects"));
const HomeBrands = lazy(() => import("@/components/home/HomeBrands"));
const Client = lazy(() => import("@/components/home/Client"));
const OurMilestones = lazy(() => import("@/components/home/OurMilestones"));
const Awards = lazy(() => import("@/components/home/Awards"));
const Afflicates = lazy(() => import("@/components/home/Afflicates"));
const EmployeeLinks = lazy(() => import("@/components/home/EmployeeLinks"));
const FeaturedNews = lazy(() => import("@/components/home/FeaturedNews"));
const ContactForm = lazy(() => import("@/components/comman/ContactForm"));

const LazyLoadComponent = ({ Component }) => {
  const { isInView, elementRef } = useInView();

  return (
    <div ref={elementRef}>
      {isInView ? (
        <Suspense fallback={<div className="min-h-screen overflow-hidden" />}>
          <Component />
        </Suspense>
      ) : (
        <div className="min-h-screen overflow-hidden" />
      )}
    </div>
  );
};

const Home = () => {
  const { data } = useGetHomeByDeptIdQuery();
  return (
    <>
      <Head
        title={data?.data?.seo?.title || "Home | NBTC"}
        description={data?.data?.seo?.metaDescription}
        canonical={data?.data?.seo?.canonicalUrl}
        ogUrl={data?.data?.seo?.ogUrl}
        ogImage={data?.data?.seo?.ogImage}
        keywords={data?.data?.seo?.metaKeywords}
      />
      <LazyLoadComponent Component={HeroSection} />
      <LazyLoadComponent Component={Introduction} />
      <LazyLoadComponent Component={OurServices} />
      {/* <LazyLoadComponent Component={HomeProjects} />
      <LazyLoadComponent Component={HomeBrands} /> */}
      <LazyLoadComponent Component={Client} />

      {/* <LazyLoadComponent Component={OurMilestones} /> */}
      <LazyLoadComponent Component={Awards} />
      <LazyLoadComponent Component={Afflicates} />
      <LazyLoadComponent Component={EmployeeLinks} />
      <LazyLoadComponent Component={FeaturedNews} />
      <LazyLoadComponent Component={ContactForm} />
    </>
  );
};

export default Home;

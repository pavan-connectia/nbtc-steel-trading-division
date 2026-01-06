import React, { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import i18n from "./i18n/i18n";
import { Layout, ScrollToTop } from "./components";

const Home = lazy(() => import("./pages/Home"));

const CorparateProfilePage = lazy(
  () => import("./pages/aboutus/CorparateProfilePage"),
);
const VisionMissionValues = lazy(
  () => import("./pages/aboutus/VisionMissionValues"),
);
const ChairmanMsg = lazy(() => import("./pages/aboutus/ChairmanMsg"));
const MdMsg = lazy(() => import("./pages/aboutus/MdMsg"));
const ExecutiveManagement = lazy(
  () => import("./pages/aboutus/ExecutiveManagement"),
);
const Qualifications = lazy(() => import("./pages/aboutus/Qualifications"));
const Subsidiary = lazy(() => import("./pages/aboutus/Subsidiary"));

const CoreBusiness = lazy(() => import("./pages/core-business/CoreBusiness"));
const Equipments = lazy(() => import("./pages/core-business/Equipments"));
const DetailEquipments = lazy(
  () => import("./pages/core-business/DetailEquipments"),
);
const CategoryEquipment = lazy(
  () => import("./pages/core-business/CategoryEquipment"),
);
const SubCategoryEquipment = lazy(
  () => import("./pages/core-business/SubCategoryEquipment"),
);

const QHSE = lazy(() => import("./pages/QHSE"));

const Projects = lazy(() => import("./pages/project/Projects"));
const DetailProject = lazy(() => import("./pages/project/DetailProject"));

const Csr = lazy(() => import("./pages/news/CSR"));
const News = lazy(() => import("./pages/news/News"));
const DetailNews = lazy(() => import("./pages/news/DetailNews"));
const PhotoGallery = lazy(() => import("./pages/news/PhotoGallery"));
const Presentations = lazy(() => import("./pages/news/Presentations"));
const Publications = lazy(() => import("./pages/news/Publications"));
const VideoGallery = lazy(() => import("./pages/news/VideoGallery"));


const Career = lazy(() => import("./pages/Career"));
const Contact = lazy(() => import("./pages/Contact"));

const Brands = lazy(() => import("./pages/Brands"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <CorparateProfilePage /> },
  { path: "/about/vision-mission-values", element: <VisionMissionValues /> },
  { path: "/about/chairman-msg", element: <ChairmanMsg /> },
  { path: "/about/md-msg", element: <MdMsg /> },
  { path: "/about/executive-management", element: <ExecutiveManagement /> },
  { path: "/about/qualifications", element: <Qualifications /> },
  { path: "/about/subsidiary", element: <Subsidiary /> },
  { path: "/products-service", element: <CoreBusiness /> },
  { path: "/products-service/equipments", element: <Equipments /> },
  {
    path: "/products-service/equipments/:category",
    element: <CategoryEquipment />,
  },
  {
    path: "/products-service/equipments/:category/:id",
    element: <DetailEquipments />,
  },
  { path: "/qhse", element: <QHSE /> },
  { path: "/projects", element: <Projects /> },
  { path: "/projects/:id", element: <DetailProject /> },
  { path: "/news", element: <News /> },
  { path: "/news/:id", element: <DetailNews /> },
  { path: "/news/csr", element: <Csr /> },
  { path: "/news/photo-gallery", element: <PhotoGallery /> },
  { path: "/news/video-gallery", element: <VideoGallery /> },
  { path: "/news/publication", element: <Publications /> },
  // { path: "/careers", element: <Career /> },
  { path: "/contact", element: <Contact /> },
  { path: "/brands/:id", element: <Brands /> },
  { path: "/employee-login", element: <EmployeeLogin /> },
  { path: "/*", element: <NotFound /> },
];

const App = () => {
  const { direction, language } = useSelector((state) => state.layoutDirection);

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", language);
    i18n.changeLanguage(language);
  }, [direction, language]);

  return (
    <Layout>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center" />
        }
      >
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;

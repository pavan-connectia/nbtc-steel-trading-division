import React, { useEffect } from "react";
import { Navbar, Footer } from "..";

const Layout = ({ children, transparent }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar transparent={transparent} />
      <main className="min-h-screen bg-textGray">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

import React from "react";
import { Header, Footer, Navigation } from "../index";

const PageTemplate = ({ children }) => {
  return (
    <>
      <Header toggleModal />
      <Navigation />
      <section style={{ height: "150vh", position: "relative" }}>
        {children}
      </section>
      <Footer />
    </>
  );
};

export default PageTemplate;

import React from "react";
import { Header, Footer, Navigation } from "../index";

const PageTemplate = ({ children }) => {
  return (
    <>
      <Header toggleModal />
      <Navigation />
      <section style={{ height: "100%", position: "relative" }}>
        {children}
      </section>
      <Footer />
    </>
  );
};

export default PageTemplate;

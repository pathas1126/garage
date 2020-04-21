import React from "react";
import { PageTemplate } from "../components";
import { SalesContainer, SalesHeaderContainer } from "../containers";

const SalesPage = () => {
  return (
    <>
      <PageTemplate>
        <SalesHeaderContainer />
        <SalesContainer />
      </PageTemplate>
    </>
  );
};

export default SalesPage;

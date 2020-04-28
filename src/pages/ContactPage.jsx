import React from "react";
import { PageTemplate } from "../components";
import { Fragment } from "react";
import { ContactContainer } from "../containers";

const ContactPage = () => {
  return (
    <Fragment>
      <PageTemplate>
        <ContactContainer />
      </PageTemplate>
    </Fragment>
  );
};

export default ContactPage;

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ContactUs } from "../components";
import { useState } from "react";

const ContactContainer = () => {
  const [contactInfo, setContactInfo] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  return (
    <section css={ContactWrapper}>
      <ContactUs contactInfo={contactInfo} setContactInfo={setContactInfo} />
    </section>
  );
};

const ContactWrapper = css`
  width: 70%;
  padding: 2rem;
  max-width: 40rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

export default ContactContainer;

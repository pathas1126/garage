/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Footer = () => {
  return (
    <footer css={setStyle()}>
      <h1>GARAGE_935</h1>
      <h4>KIC TEAM PROJECT</h4>
    </footer>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: black;
    h1,
    h4 {
      margin: 0;
      color: white;
    }
  `;
  return [defaultStyle];
};

export default Footer;

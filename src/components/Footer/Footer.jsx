/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Footer = () => {
  return (
    <footer css={setStyle()}>
      <h1>935 GARAGE PROJECT</h1>
    </footer>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    width: 100%;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    h1 {
      margin: 0;
      color: white;
    }
  `;
  return [defaultStyle];
};

export default Footer;

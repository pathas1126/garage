/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../index";
import { COLORS } from "../../assets/colors";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header css={setStyle()}>
      <section>
        <Link to="/login">
          <Button variation="noborder" color="secondary">
            Login
          </Button>
        </Link>
        <Link to="/mypage">
          <Button variation="noborder" color="secondary">
            MyPage
          </Button>
        </Link>
        <Link to="/contact">
          <Button variation="noborder" color="secondary">
            Contact
          </Button>
        </Link>
      </section>
      <h1>HEADER</h1>
    </header>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    position: relative;
    width: 100%;
    height: 14rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${COLORS.teritiaty};
    section {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 2rem;
      color: white;
      a {
        text-decoration: none;
      }
    }
    h1 {
      color: white;
    }
  `;
  return [defaultStyle];
};

export default Header;

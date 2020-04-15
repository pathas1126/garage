/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";
import { COLORS } from "../../assets/colors";
import { Button } from "../index";

const Navigation = () => {
  return (
    <nav css={setStyle()}>
      <ul>
        <li>
          <Link to="/">
            <Button>MAIN</Button>
          </Link>
        </li>
        <li>
          <Link to="/sales">
            <Button>SALES</Button>
          </Link>
        </li>
        <li>
          <Link to="/enjoy">
            <Button>MUSIC</Button>
          </Link>
        </li>
        <li>
          <Link to="/qna">
            <Button>QnA</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${COLORS.primary};
    ul {
      width: 80%;
      list-style: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      a {
        text-decoration: none;
      }
    }
  `;
  return [defaultStyle];
};

export default Navigation;

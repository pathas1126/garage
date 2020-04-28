/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";
import { Button } from "../index";

const Navigation = () => {
  return (
    <nav css={setStyle()}>
      <ul>
        <li>
          <Link to="/sales">
            <Button variation="noborder" color="teritiaty">
              SALES
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/notice">
            <Button variation="noborder" color="teritiaty">
              NOTICE
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/qna">
            <Button variation="noborder" color="teritiaty">
              QnA
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const setStyle = () => {
  const defaultStyle = css`
    margin: 0 auto;
    width: 99%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-bottom: 1px solid #dedede;
    z-index: 11;
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
    button {
      font-weight: 600;
    }
  `;
  return [defaultStyle];
};

export default Navigation;

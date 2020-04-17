/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Input, Button } from "../components";
import { Link } from "react-router-dom";

const SalesHeaderContainer = () => {
  return (
    <nav css={SalesHeaderWrapper}>
      <div>
        <Input />
        <Button variation="noborder" color="secondary">
          검색
        </Button>
        <Link to="/sales/write">
          <Button variation="noborder" color="secondary">
            글쓰기
          </Button>
        </Link>
      </div>
    </nav>
  );
};

const SalesHeaderWrapper = css`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
  }
`;

export default SalesHeaderContainer;

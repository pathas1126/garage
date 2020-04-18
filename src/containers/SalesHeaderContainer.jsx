/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Input, Button } from "../components";

const SalesHeaderContainer = () => {
  const checkLogin = () => {
    if (JSON.parse(sessionStorage.getItem("logon")) === true) {
      window.location.href = "/sales/write";
    } else {
      alert("로그인 하셔야 글을 작성하실 수 있습니다.");
      return (window.location.href = "/login");
    }
  };

  return (
    <nav css={SalesHeaderWrapper}>
      <div>
        <Input />
        <Button variation="noborder" color="secondary">
          검색
        </Button>
        <Button variation="noborder" color="secondary" onClick={checkLogin}>
          글쓰기
        </Button>
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

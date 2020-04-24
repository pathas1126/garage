/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Input, Button, Form, Select } from "../components";
import { useContext, useState } from "react";
import { LoginContext } from "../store";
import { fetchData } from "../library";

const SalesHeaderContainer = ({ setItems, setSearching }) => {
  const [searchData, setSearchData] = useState({
    searchText: "기타",
    searchType: "악기",
  });

  const { searchType } = searchData;

  const { loginStatus } = useContext(LoginContext);

  const checkLogin = () => {
    if (loginStatus.logon === true) {
      window.location.href = "/sales/write";
    } else {
      alert("로그인 하셔야 글을 작성하실 수 있습니다.");
      return (window.location.href = "/login");
    }
  };

  // 인풋 값 가져오는
  const getValues = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  // 검색 함수
  const onSearch = (e) => {
    e.preventDefault();
    let { searchText, searchType } = searchData;

    switch (searchType) {
      case "제목":
        searchType = "n";
        break;
      case "판매자":
        searchType = "s";
        break;
      case "악기":
        searchType = "m";
        break;
      default:
        return null;
    }

    setSearching(true);

    fetchData({
      url: `/sales/item?searchType=${searchType}&keyword=${searchText}`,
      method: "GET",
    })
      .then((res) => {
        if (res.data.length > 0) {
          setItems((prevItems) => res.data);
        } else {
          return alert("검색 결과가 없습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <nav css={SalesHeaderWrapper}>
      <form onSubmit={onSearch} css={searchWrapper}>
        <Select
          name="searchType"
          value={["악기", "제목", "판매자"]}
          width="20%"
          onChange={getValues}
        ></Select>
        {searchType === "악기" ? (
          <Select
            name="searchText"
            value={["기타", "베이스", "드럼", "키보드"]}
            width="50%"
            onChange={getValues}
          ></Select>
        ) : (
          <Input
            value={searchData.searchText}
            onChange={getValues}
            placeholder="검색 내용을 입력하세요."
            name="searchText"
          />
        )}

        <Button variation="noborder" color="secondary" type="submit">
          검색
        </Button>
      </form>
      <Button variation="noborder" color="secondary" onClick={checkLogin}>
        상품 판매
      </Button>
    </nav>
  );
};

const SalesHeaderWrapper = css`
  width: 100%;
  min-width: 33rem;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
  }
`;

const searchWrapper = css`
  width: 40%;
  min-width: 25rem;
  margin-right: 1rem;
  display: flex;
  justify-content: space-evenly;
`;

export default SalesHeaderContainer;

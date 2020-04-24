/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../Button";
import { COLORS } from "../../assets/colors";
import { useContext } from "react";
import { LoginContext } from "../../store";
import { Link } from "react-router-dom";
import { fetchData } from "../../library";
import { SalesReplyContainer } from "../../containers";

const Detail = (props) => {
  const {
    item_Number,
    user_Id,
    item_Writer,
    item_Sort,
    item_Price,
    item_Detail,
    sales_Contact,
    sales_KakaoId,
    deal_Location,
    item_Name,
    item_Picture,
    item_Date,
    item_Replies,
    setItem_Replies,
  } = props;

  const { loginStatus } = useContext(LoginContext);

  const onRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      fetchData({
        method: "POST",
        url: "/sales/detail/remove",
        data: { item_Number },
      })
        .then((res) => {
          if (res.data === true) {
            window.location.href = "/sales";
            return alert("글이 삭제되었습니다.");
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <section css={detailWrapperStyle}>
      <img src={item_Picture} alt="" />
      <header css={headerStyle}>
        <h1>{item_Name}</h1>
      </header>
      <table css={infoStyle}>
        <tbody>
          <tr>
            <td>판매자</td>
            <td>{item_Writer}</td>
          </tr>
          <tr>
            <td>판매자 연락처</td>
            <td>{sales_Contact}</td>
          </tr>
          <tr>
            <td>카카오톡ID</td>
            <td>{sales_KakaoId}</td>
          </tr>
          <tr>
            <td>악기 종류</td>
            <td>{item_Sort}</td>
          </tr>
          <tr>
            <td>거래 위치</td>
            <td>{deal_Location}</td>
          </tr>
          <tr>
            <td>가격</td>
            <td>{item_Price}</td>
          </tr>
          <tr>
            <td>작성 시간</td>
            <td>{item_Date}</td>
          </tr>
        </tbody>
      </table>
      <fieldset css={detailStyle}>
        <legend>본문 내용</legend>
        <p>{item_Detail}</p>
      </fieldset>
      <SalesReplyContainer
        item_Number={item_Number}
        item_Replies={item_Replies}
        setItem_Replies={setItem_Replies}
      />
      <footer css={footerStyle}>
        <Button onClick={() => window.history.go(-1)} variation="outline">
          돌아가기
        </Button>
        {loginStatus.user_Id === user_Id && (
          <div>
            <Link to={`/sales/detail/${item_Number}/update`}>
              <Button variation="outline" color="secondary">
                글 수정
              </Button>
            </Link>
            <Button variation="outline" color="warning" onClick={onRemove}>
              글 삭제
            </Button>
          </div>
        )}
      </footer>
    </section>
  );
};

const detailWrapperStyle = css`
  margin: 1rem auto;
  padding-bottom: 1rem;
  width: 50%;
  min-width: 29rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  color: ${COLORS.teritiaty};
  img {
    padding: 2rem;
    width: 80%;
  }
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

const headerStyle = css`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1rem 0.3rem;
  border: 1px solid ${COLORS.primary};
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  span {
    background: ${COLORS.secondary};
    padding: 0.4rem;
    border-radius: 0.2rem;
    color: white;
  }
`;

const infoStyle = css`
  width: 82%;
  padding: 0.3rem;
  border: 1px solid ${COLORS.primary};
  border-radius: 0.3rem;
  tr {
    line-height: 2rem;
  }
`;

const detailStyle = css`
  margin-bottom: 2rem;
  width: 80%;
  padding: 0.3rem;
  border: 1px solid ${COLORS.primary};
  border-radius: 0.3rem;
`;

const footerStyle = css`
  margin-top: 1rem;
  width: 83%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    margin-right: 1rem;
  }
`;

export default Detail;

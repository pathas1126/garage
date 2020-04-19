/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../Button";
import { COLORS } from "../../assets/colors";

const Detail = ({
  item_Number,
  user_Id,
  item_Writer,
  item_Sort,
  item_Brand_model,
  item_Price,
  item_Detail,
  item_Status,
  sales_Contact,
  sales_KakaoId,
  deal_Location,
  item_Name,
  item_Picture,
}) => {
  return (
    <section css={detailWrapperStyle}>
      <img src={item_Picture} alt="" />
      <header css={headerStyle}>
        <h1>{item_Name}</h1> <span>{item_Status}</span>
      </header>
      <table css={infoStyle}>
        <tbody>
          <tr>
            <td>판매자</td>
            <td>{item_Writer}</td>
          </tr>
          <tr>
            <td>악기 종류</td>
            <td>{item_Sort}</td>
          </tr>
          <tr>
            <td>제조사</td>
            <td>{item_Brand_model}</td>
          </tr>
          <tr>
            <td>카카오톡ID</td>
            <td>{sales_KakaoId}</td>
          </tr>
          <tr>
            <td>거래 위치</td>
            <td>{deal_Location}</td>
          </tr>
          <tr>
            <td>가격</td>
            <td>{item_Price} 원</td>
          </tr>
        </tbody>
      </table>
      <p css={detailStyle}>{item_Detail}</p>
      <Button onClick={() => window.history.go(-1)} variation="outline">
        돌아가기
      </Button>
    </section>
  );
};

const detailWrapperStyle = css`
  margin: 1rem auto;
  padding-bottom: 1rem;
  width: 50%;
  min-width: 25rem;
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
  width: 80%;
  padding: 0.3rem;
  border: 1px solid ${COLORS.primary};
  border-radius: 0.3rem;
  tr {
    line-height: 2rem;
  }
`;

const detailStyle = css`
  width: 80%;
  padding: 0.3rem;
  border: 1px solid ${COLORS.primary};
  border-radius: 0.3rem;
`;
export default Detail;

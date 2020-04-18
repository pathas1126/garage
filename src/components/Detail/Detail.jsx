/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { IMAGES } from "../../assets/images";
import { Button } from "../Button";

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
      <article>
        <img src={item_Picture} alt="" />
      </article>
      <article css={headerStyle}>
        <h1>{item_Name}</h1>
        <h2>{item_Status}</h2>
      </article>
      <article css={infoStyle}>
        <table>
          <tr>
            <td>판매자</td>
            <td>{item_Writer}</td>
          </tr>
          <tr>
            <td>제조사</td>
            <td>{item_Brand_model}</td>
          </tr>
          <tr>
            <td>판매자 카카오톡ID</td>
            <td>{sales_KakaoId}</td>
          </tr>
          <tr>
            <td>거래 위치</td>
            <td>{deal_Location}</td>
          </tr>
          <tr>
            <td>가격</td>
            <td>{item_Price}</td>
          </tr>
        </table>
        <p>{item_Detail}</p>
      </article>
      <Button onClick={() => window.history.go(-1)} variation="outline">
        돌아가기
      </Button>
    </section>
  );
};

const detailWrapperStyle = css`
  margin: 1rem auto;
  padding-bottom: 1rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  img {
    width: 100%;
    height: 100%;
  }
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

const headerStyle = css`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 400;
  }
  h2 {
    margin: 0;
    margin-top: 0.4rem;
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

const infoStyle = css`
  margin-top: 1rem;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  td {
    margin: 0;
    margin-top: 0.4rem;
    font-weight: 400;
  }
  table > tr > td + td {
    padding-right: 8rem;
  }
`;

export default Detail;

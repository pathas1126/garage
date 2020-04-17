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
        <img src={IMAGES.violin} alt="" />
      </article>
      <article css={headerStyle}>
        <h1>{item_Name}</h1>
        <h2>{item_Status}</h2>
      </article>
      <article css={infoStyle}>
        <h2>판매자: {item_Writer}</h2>
        <h2>제조사: {item_Brand_model}</h2>
        <h2>판매자 카카오톡: {sales_KakaoId}</h2>
        <h2>거래 위치: {deal_Location}</h2>
        <h2>가격: {item_Price}</h2>
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
  h2 {
    margin: 0;
    margin-top: 0.4rem;
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

export default Detail;

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { IMAGES } from "../../assets/images";
import { Button } from "../";
import { Link } from "react-router-dom";

const Card = ({
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
  onClick,
}) => {
  return (
    <article css={defaultStyle}>
      <div css={[imageWrapper]}>
        <img src={IMAGES.violin} alt="" width="100%" height="100%" />
      </div>
      <div css={infoWrapper}>
        <div css={headerStyle}>
          <h1>{item_Name}</h1>
          <h2>{item_Brand_model}</h2>
        </div>
        <div css={bottomStyle}>
          <span>{item_Status}</span>
          <Link to={`/sales/detail/${item_Number}`}>
            <Button variation="noborder">더 보기</Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

const defaultStyle = css`
  margin: 0.5rem;
  width: 23rem;
  display: inline-block;
  flex-direction: column;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
`;

const imageWrapper = css`
  width: 100%;
  height: 18rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const infoWrapper = css`
  width: 100%;
`;

const headerStyle = css`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 1rem;
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

const bottomStyle = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  span {
    padding-left: 1rem;
  }
  a {
    text-decoration: none;
  }
`;

Card.propTypes = {
  item_Number: PropTypes.number.isRequired,
  user_Id: PropTypes.string.isRequired,
  item_Writer: PropTypes.string.isRequired,
  item_Sort: PropTypes.string.isRequired,
  item_Brand_model: PropTypes.string.isRequired,
  item_Price: PropTypes.number.isRequired,
  item_Detail: PropTypes.string.isRequired,
  item_Status: PropTypes.string.isRequired,
  sales_Contact: PropTypes.string.isRequired,
  sales_KakaoId: PropTypes.string.isRequired,
  deal_Location: PropTypes.string.isRequired,
  item_Name: PropTypes.string.isRequired,
  item_Picture: PropTypes.string.isRequired,
};

export default Card;

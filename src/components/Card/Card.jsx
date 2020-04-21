/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { Button } from "../";
import { Link } from "react-router-dom";
import { COLORS } from "../../assets/colors";

const Card = ({
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
  onClick,
}) => {
  return (
    <section css={defaultStyle}>
      <div css={[imageWrapper]}>
        <img src={item_Picture} alt="" width="100%" height="100%" />
      </div>
      <article css={bodyStyle}>
        <div css={headerStyle}>
          <h1>{item_Name}</h1>
        </div>
        <div css={infoStyle}>
          <fieldset>
            <legend>본문 내용</legend>
            <p>{item_Detail && item_Detail.slice(0, 80)}...</p>
          </fieldset>
        </div>
        <div css={bottomStyle}>
          <Link to={`/sales/detail/${item_Number}`}>
            <Button variation="noborder">더 보기</Button>
          </Link>
        </div>
      </article>
    </section>
  );
};

const defaultStyle = css`
  margin: 0.8rem;
  width: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
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

const bodyStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const headerStyle = css`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin: 0.5rem;
    font-size: 1.6rem;
    font-weight: 400;
  }
  span {
    background: ${COLORS.secondary};
    padding: 0.4rem;
    margin-right: 0.5rem;
    border-radius: 0.2rem;
    color: white;
  }
`;

const infoStyle = css`
  width: 90%;
  fieldset {
    border: 1px solid ${COLORS.secondary};
  }
  fieldset > legend {
    padding: 0.2rem;
    margin-right: 0.5rem;
    color: ${COLORS.secondary};
  }
  p {
    margin: 0.4rem 0 0 0;
  }
`;

const bottomStyle = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  a {
    text-decoration: none;
  }
`;

Card.propTypes = {
  item_Number: PropTypes.number.isRequired,
  user_Id: PropTypes.string.isRequired,
  item_Writer: PropTypes.string.isRequired,
  item_Sort: PropTypes.string.isRequired,
  item_Price: PropTypes.string.isRequired,
  item_Detail: PropTypes.string.isRequired,
  sales_Contact: PropTypes.string.isRequired,
  sales_KakaoId: PropTypes.string.isRequired,
  deal_Location: PropTypes.string.isRequired,
  item_Name: PropTypes.string.isRequired,
  item_Picture: PropTypes.string.isRequired,
};

export default Card;

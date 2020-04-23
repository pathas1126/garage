/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { COLORS } from "../../assets/colors";
import { Button } from "../Button";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const NoticeRow = ({
  notice_Date,
  notice_Number,
  notice_Subject,
  manager_Id,
  admin,
}) => {
  return (
    <tr css={rowStyle}>
      <Link>
        <td>{notice_Subject}</td>
      </Link>
      <td>
        <span>{notice_Date.slice(0, 10)}</span>
        <span>{manager_Id}</span>
        {admin && (
          <Fragment>
            <Button variation="outline" color="secondary">
              수정
            </Button>
            <Button variation="outline" color="warning">
              삭제
            </Button>
          </Fragment>
        )}
      </td>
    </tr>
  );
};

const rowStyle = css`
  margin: 1rem auto;
  padding: 2rem 1rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${COLORS.primary};
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }

  a {
    text-decoration: none;
    margin-right: 14rem;
  }
  a:active {
    color: black;
  }
  a:visited {
    color: black;
  }
  span + span {
    margin-left: 1rem;
  }
  button {
    margin-left: 3rem;
  }
  button + button {
    margin-left: 1rem;
  }
`;

export default NoticeRow;

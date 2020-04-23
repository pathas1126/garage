/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { COLORS } from "../../assets/colors";
import { Button } from "../Button";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../library";

const NoticeRow = ({
  notice_Date,
  notice_Number,
  notice_Subject,
  manager_Id,
  notice_Readcount,
  notice_Content,
  admin,
  setNoticePosts,
}) => {
  const [contentView, setContentView] = useState(false);

  // 공지사항 세부 내용 조회
  const getContent = () => {
    if (!sessionStorage.getItem("admin")) increaseReadCount();
    setContentView(!contentView);
  };

  // 조회수 증가 함수
  const increaseReadCount = () => {
    fetchData({
      method: "POST",
      url: "/notice/readcount",
      data: { notice_Number, notice_Readcount },
    }).catch((err) => {
      throw err;
    });
  };

  // 공지 삭제 함수
  const removeNotice = () => {
    fetchData({
      method: "POST",
      url: "/notice/d",
      data: { notice_Number },
    })
      .then((res) => {
        if (res.data) {
          setNoticePosts((prevPosts) =>
            prevPosts.filter((v) => v.notice_Number !== notice_Number)
          );
          alert("글이 정상적으로 삭제되었습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Fragment>
      <tr css={rowStyle}>
        <td>
          <h3 onClick={getContent}>{notice_Subject}</h3>
        </td>
        <td>
          <span>조회수: {notice_Readcount}</span>
          <span>{notice_Date.slice(0, 10)}</span>
          <span>{manager_Id}</span>
          {admin && (
            <Fragment>
              <Button variation="outline" color="secondary">
                수정
              </Button>
              <Button
                variation="outline"
                color="warning"
                onClick={removeNotice}
              >
                삭제
              </Button>
            </Fragment>
          )}
        </td>
      </tr>
      {contentView && (
        <tr>
          <td css={contentStyle}>
            <p>{notice_Content}</p>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

const rowStyle = css`
  margin: 0 auto;
  margin-top: 1rem;
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
  h3 {
    cursor: pointer;
  }
  h3:active {
    transform: scale(0.99);
    color: #9c9c9c;
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

const contentStyle = css`
  margin: 0 auto;
  margin-top: -0.1rem;
  padding: 2rem 1rem;
  width: 90%;
  display: block;
  background: #0a3d62;
  color: white;
  border: 1px solid ${COLORS.primary};
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  animation-name: fadeIn;
  animation-duration: 0.3s;
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`;

export default NoticeRow;

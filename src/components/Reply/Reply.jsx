/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { fetchData } from "../../library";

const Reply = ({
  item_Detail,
  item_Number,
  item_Reply_date,
  item_Reply_writer,
  item_Rnumber,
  setItem_Replies,
}) => {
  const [sameUser, setSameUser] = useState(false);

  useEffect(() => {
    const currentUser = sessionStorage.getItem("user_Name");
    if (item_Reply_writer === currentUser) {
      setSameUser(true);
    }
  }, [item_Reply_writer]);

  const onUpdate = () => {
    alert("수정 함수 구현");
  };

  // 댓글 삭제 함수
  const onRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?"))
      fetchData({
        method: "POST",
        url: `/sales/detail/item/${item_Rnumber}`,
      })
        .then((res) => {
          if (res.data) {
            setItem_Replies((prevReplies) =>
              prevReplies.filter((reply) => reply.item_Rnumber !== item_Rnumber)
            );
          }
        })
        .catch((err) => {
          throw err;
        });
  };

  return (
    <article css={ReplyWrapper}>
      <header>
        <span> {item_Reply_writer}</span>
        {sameUser && (
          <div>
            <span onClick={onUpdate}>
              <BsPencilSquare />
            </span>
            <span onClick={onRemove}>
              <AiOutlineClose />
            </span>
          </div>
        )}
      </header>
      <p>{item_Detail}</p>
      <footer>
        <span>{item_Reply_date}</span>
      </footer>
    </article>
  );
};

const ReplyWrapper = css`
  width: 93%;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);

  header {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div > span {
      cursor: pointer;
      & + span {
        margin-left: 1rem;
      }
      &:hover {
        color: #006266;
      }
      &:active {
        color: red;
      }
    }
  }
  footer {
    text-align: right;
    font-size: 0.8rem;
  }
`;
export default Reply;

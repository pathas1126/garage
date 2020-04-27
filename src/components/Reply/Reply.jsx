/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { fetchData } from "../../library";
import { Button } from "../index";

const Reply = ({
  item_Detail,
  item_Number,
  item_Reply_date,
  item_Reply_writer,
  item_Rnumber,
  setItem_Replies,
}) => {
  const [sameUser, setSameUser] = useState(false);

  const [updating, setUpdating] = useState(false);

  const [newItem_Detail, setNewItem_Detail] = useState(item_Detail);

  const getValues = (e) => {
    const { value } = e.target;
    setNewItem_Detail(value);
  };

  useEffect(() => {
    const currentUser = sessionStorage.getItem("user_Name");
    if (item_Reply_writer === currentUser) {
      setSameUser(true);
    }
  }, [item_Reply_writer]);

  const onUpdate = () => {
    setUpdating(true);
  };

  // 댓글 수정 함수
  const onSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "PUT",
      url: "/sales/detail/upload/reply",
      data: { item_Detail: newItem_Detail, item_Rnumber },
    })
      .then((res) => {
        setNewItem_Detail(newItem_Detail);
        alert("댓글 수정을 완료했습니다.");
        setUpdating(false);
      })
      .catch((err) => {
        throw err;
      });
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
      {!updating ? (
        <Fragment>
          <p>{newItem_Detail}</p>
          <footer>
            <span>{item_Reply_date}</span>
          </footer>
        </Fragment>
      ) : (
        <form onSubmit={onSubmit}>
          <textarea
            name="newItem_Detail"
            value={newItem_Detail}
            onChange={getValues}
          ></textarea>
          <Button
            variation="noborder"
            size="small"
            type="submit"
            color="teritiaty"
          >
            수정 완료
          </Button>
        </form>
      )}
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

  form {
    margin: 1rem auto;
    position: relative;
    width: 99%;
    textarea {
      width: 98.5%;
      height: 4rem;
      resize: none;
    }
    button {
      position: absolute;
      bottom: 0.2rem;
      right: 0;
      font-size: 0.8rem;
    }
  }
`;
export default Reply;

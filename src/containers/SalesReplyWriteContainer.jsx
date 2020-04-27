/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../components";
import { useState } from "react";
import { fetchData } from "../library";

const SalesReplyWriteContainer = ({ item_Number, setItem_Replies }) => {
  const [replyData, setReplyData] = useState({
    item_Number,
    item_Rnumber: 0,
    item_Detail: "",
    item_Reply_date: "",
    item_Reply_writer: "",
  });
  const getValues = (e) => {
    const { name, value } = e.target;
    setReplyData({
      ...replyData,
      [name]: value,
    });
  };

  const writeReply = (e) => {
    e.preventDefault();

    if (!JSON.parse(sessionStorage.getItem("logon"))) {
      alert("로그인이 필요합니다.");
      return (window.location.href = "/login");
    }
    const date = new Date();

    const data = {
      ...replyData,
      item_Rnumber: Date.now(),
      item_Reply_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date
        .toString()
        .slice(16, 24)}`,
      item_Reply_writer: sessionStorage.getItem("user_Name"),
    };
    fetchData({
      method: "POST",
      url: "/sales/write/reply",
      data,
    })
      .then((res) => {
        if (res.data) {
          setItem_Replies((prevReplies) => prevReplies.concat(data));
          setReplyData({
            item_Number: 0,
            item_Rnumber: 0,
            item_Detail: "",
            item_Reply_date: "",
            item_Reply_writer: "",
          });
          alert("댓글을 작성했습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <section css={ReplyWriteWrapper}>
      <form onSubmit={writeReply}>
        <article>
          <textarea
            name="item_Detail"
            onChange={getValues}
            placeholder="댓글을 입력해주세요"
            value={replyData.item_Detail}
          ></textarea>
          <div>
            <Button
              size="small"
              variation="outline"
              color="teritiaty"
              type="submit"
            >
              댓글 작성
            </Button>
          </div>
        </article>
      </form>
    </section>
  );
};

const ReplyWriteWrapper = css`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    width: 99%;
  }
  textarea {
    width: 98.5%;
    height: 4rem;
    resize: none;
  }
  div {
    width: 99%;
    display: flex;
    justify-content: flex-end;
    button {
      font-size: 0.6rem;
    }
  }
`;

export default SalesReplyWriteContainer;

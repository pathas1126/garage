/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../components";
import { useState } from "react";
import { fetchData } from "../library";

const QnAReplyWriteContainer = ({ qna_Number, qna_Writer, setQnaReplies }) => {
  const [qnaReplyData, setQnaReplyData] = useState({
    qna_Rnumber: Date.now(),
    qna_Name: "",
    qna_Detail: "",
    qna_Number,
    qna_Reply_date: "",
  });

  const { qna_Detail } = qnaReplyData;

  const getTextValues = (e) => {
    const { value } = e.target;
    setQnaReplyData((prevData) => ({ ...prevData, qna_Detail: value }));
  };

  const writeReply = (e) => {
    e.preventDefault();

    if (qna_Detail.trim().length === 0) {
      return alert("내용을 입력해 주세요.");
    }

    let qna_Name = qnaReplyData.qna_Name;
    if (sessionStorage.getItem("user_Name") === "관리자") {
      qna_Name = "관리자";
    } else {
      qna_Name = qna_Writer;
    }

    const date = new Date();
    const data = {
      ...qnaReplyData,
      qna_Name,
      qna_Reply_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date
        .toString()
        .slice(16, 24)}`,
    };

    fetchData({ method: "POST", url: `qna/${qna_Number}`, data })
      .then((res) => {
        if (res.data) {
          setQnaReplies((prevReplies) => [data].concat(prevReplies));
          setQnaReplyData((prevData) => ({ ...prevData, qna_Detail: "" }));
          alert("댓글을 작성했습니다.");
        } else {
          alert("댓글을 작성할 수 없습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <section css={QnAReplyWriteStyle}>
      <form css={formStyle} onSubmit={writeReply}>
        <textarea
          name="qna_Detail"
          value={qna_Detail}
          onChange={getTextValues}
        ></textarea>
        <Button
          variation="noborder"
          size="small"
          type="submit"
          color="secondary"
        >
          댓글 작성
        </Button>
      </form>
    </section>
  );
};

const QnAReplyWriteStyle = css`
  padding: 1rem 0;
`;

const formStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  textarea {
    width: 90%;
    min-height: 4rem;
    margin: 1rem auto;
    resize: none;
  }
  button {
    position: absolute;
    bottom: -1.1rem;
    right: 1.5rem;
    font-size: 0.8rem;
  }
`;

export default QnAReplyWriteContainer;

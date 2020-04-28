/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../Button";
import { fetchData } from "../../library";

const QnAReply = ({
  qna_Name,
  qna_Detail,
  qna_Reply_date,
  qna_Writer,
  qna_Rnumber,
  setQnaReplies,
}) => {
  const onRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?"))
      fetchData({ method: "POST", url: `/qna/reply/${qna_Rnumber}` })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            setQnaReplies((prevReplies) =>
              prevReplies.filter((reply) => reply.qna_Rnumber !== qna_Rnumber)
            );
            alert("댓글을 삭제했습니다.");
          }
        })
        .catch((err) => {
          throw err;
        });
  };
  return (
    <section css={QnAReplyStyle}>
      <article css={contentStyle}>
        <h3 css={qna_Name === "관리자" && adminStyle}>{qna_Name}</h3>
        <p>{qna_Detail}</p>
      </article>
      <footer css={footerStyle}>
        <span>{qna_Reply_date}</span>
        {qna_Name === "관리자" ||
          (qna_Name === qna_Writer && (
            <Button
              variation="outline"
              onClick={onRemove}
              size="small"
              color="warning"
            >
              삭제
            </Button>
          ))}
      </footer>
    </section>
  );
};

const QnAReplyStyle = css`
  width: 90%;
  margin: 0 auto;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
`;

const contentStyle = css`
  h3 {
    padding-top: 1rem;
    width: 90%;
    padding-bottom: 0.3rem;
    margin-top: 0;
    margin-left: 1rem;
    border-bottom: 1px solid #dedede;
  }
  p {
    margin-left: 1rem;
    min-height: 4rem;
  }
`;

const adminStyle = css`
  color: #40739e;
`;

const footerStyle = css`
  width: 95%;
  margin: 0 auto;
  margin-top: 0.5rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    padding-top: 0.8rem;
    display: block;
    text-align: right;
    font-size: 0.8rem;
  }
  button {
    font-size: 0.9rem;
  }
  span + button {
    margin-left: 0.8rem;
  }
`;

export default QnAReply;

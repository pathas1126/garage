/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Button } from "../Button";
import { fetchData } from "../../library";
import { useState } from "react";

const QnADetail = ({
  qna_Content,
  qna_Number,
  setQna,
  qna_Writer,
  qna_Password,
  qna_Subject,
  qna_Date,
}) => {
  const [updating, setUpdating] = useState(false);
  const [newContent, setNewContent] = useState(qna_Content);
  const [prevContent, setPrevContent] = useState(qna_Content);

  const onUpdate = (e) => {
    e.preventDefault();

    const data = {
      qna_Content: newContent,
      qna_Number,
      qna_Writer,
      qna_Password,
      qna_Subject,
      qna_Date,
    };

    fetchData({ method: "PUT", url: `qna/${qna_Number}`, data })
      .then((res) => {
        if (res.data) {
          setPrevContent(newContent);
          setUpdating(false);
          alert("댓글을 수정했습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const getInputValue = (e) => {
    const { value } = e.target;
    setNewContent(value);
  };

  const onRemove = () => {
    if (window.confirm("정말로 삭제하시겠습니까?"))
      fetchData({
        method: "POST",
        url: `/qna/d/${qna_Number}`,
        data: { qna_Number },
      })
        .then((res) => {
          if (res.data) {
            setQna((prevQna) =>
              prevQna.filter((v) => v.qna_Number !== qna_Number)
            );
            alert("댓글이 정상적으로 삭제되었습니다.");
          }
        })
        .catch((err) => {
          throw err;
        });
  };

  return (
    <article css={QnADetailStyle}>
      {updating ? (
        <form onSubmit={onUpdate} css={formStyle}>
          <textarea
            name="qna_Content"
            onChange={getInputValue}
            value={newContent}
          ></textarea>
          <Button
            variation="noborder"
            color="secondary"
            size="small"
            type="submit"
          >
            수정 완료
          </Button>
        </form>
      ) : (
        <p css={pStyle}>{prevContent}</p>
      )}
      <footer css={buttonWrapper}>
        <Button
          onClick={() => {
            setUpdating(!updating);
          }}
          size="small"
          variation="outline"
          color="teritiaty"
        >
          {updating ? <span> 취소 </span> : <span>수정</span>}
        </Button>
        <Button
          onClick={onRemove}
          size="small"
          variation="outline"
          color="warning"
        >
          삭제
        </Button>
      </footer>
    </article>
  );
};

const QnADetailStyle = css`
  margin: 1rem auto;
  padding-bottom: 1rem;
`;

const pStyle = css`
  width: 85%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  padding: 1rem;
  border: 1px solid #cdcdcd;
`;

const formStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  textarea {
    width: 90%;
    min-height: 5rem;
    margin-bottom: 1rem;
    resize: none;
  }
  button {
    position: absolute;
    right: 2rem;
    bottom: 1.2rem;
    font-size: 0.8rem;
  }
`;

const buttonWrapper = css`
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    font-size: 1rem;
    margin-right: 0.5rem;
    & + button {
      margin-left: 0;
    }
  }
`;

export default QnADetail;

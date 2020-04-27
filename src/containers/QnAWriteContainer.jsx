/**@jsx jsx */
import { jsx, css } from "@emotion/core";
import { Input, Button } from "../components";
import { useState, useEffect, Fragment } from "react";
import { fetchData } from "../library";

const QnAWriteContainer = () => {
  const [qnaData, setQnaData] = useState({
    qna_Number: 0,
    qna_Writer: "",
    qna_Password: "",
    qna_Subject: "",
    qna_Content: "",
    qna_Date: "",
  });
  const [haveSession, setHaveSession] = useState(false);

  const { qna_Writer, qna_Password, qna_Subject, qna_Content } = qnaData;

  const getValues = (e) => {
    const { name, value } = e.target;
    setQnaData((prevQna) => ({ ...prevQna, [name]: value }));
  };

  useEffect(() => {
    const sessionName = sessionStorage.getItem("user_Name");
    if (sessionName) {
      setQnaData((prevQna) => ({
        ...prevQna,
        qna_Writer: sessionName,
      }));
      setHaveSession(true);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    fetchData({
      method: "POST",
      url: "qna",
      data: {
        ...qnaData,
        qna_Number: Date.now(),
        qna_Date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date
          .toString()
          .slice(16, 24)}`,
      },
    })
      .then((res) => {
        if (res.data) {
          setQnaData({
            qna_Number: 0,
            qna_Writer: "",
            qna_Password: "",
            qna_Subject: "",
            qna_Content: "",
            qna_Date: "",
          });
          alert("질문을 등록했습니다.");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <section css={sectionWrapper}>
      <h1>질문 등록하기</h1>
      <form css={formStyle} onSubmit={onSubmit}>
        <Input
          width="100%"
          placeholder="제목을 입력하세요"
          name="qna_Subject"
          value={qna_Subject}
          onChange={getValues}
        />
        <div>
          <label htmlFor="qna_Writer">닉네임</label>
          {haveSession ? (
            <span>{qna_Writer}</span>
          ) : (
            <Fragment>
              <Input
                name="qna_Writer"
                value={qna_Writer}
                placeholder="닉네임을 입력하세요."
                onChange={getValues}
              />
            </Fragment>
          )}
        </div>
        <div>
          <label htmlFor="qna_Writer">게시글 비밀번호</label>
          <Input
            name="qna_Password"
            value={qna_Password}
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={getValues}
          />
        </div>
        <textarea
          name="qna_Content"
          value={qna_Content}
          onChange={getValues}
          placeholder="질문하실 내용을 입력하세요."
        ></textarea>
        <Button variation="outline" color="teritiaty" type="submit">
          등록하기
        </Button>
      </form>
    </section>
  );
};

const sectionWrapper = css`
  width: 70%;
  padding: 2rem;
  max-width: 40rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
  h1 {
    font-size: 1.4rem;
  }
`;

const formStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  textarea {
    margin: 1rem;
    width: 100%;
    resize: none;
    height: 10rem;
  }
  div {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div > label {
    display: inline-block;
    width: 12rem;
    margin-right: 1rem;
  }
`;
export default QnAWriteContainer;
